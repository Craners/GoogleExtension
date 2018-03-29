$(document).ready(function () {

  if (GetLocal("BackGround") === "") {

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');
    var rand = Math.floor((Math.random() * 24) + 1);

    var obj = {

      "today": day,
      "randomNumber": rand
    }
    SaveLocal('BackGround', obj);
    $('.layout-transparent').css('background-image', 'url(' + `../background/${rand}.jpg` + ')');
  } else {

    var data = GetLocal("BackGround");
    var x = data.length-1;
    data = data[x];

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');

    if (data.today == day) {

      console.log('its the same day!');
      $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
    }
    else {

      var rand = Math.floor((Math.random() * 23) + 1);
      data.today = day;
      data.randomNumber = rand;

      SaveLocal('BackGround', data);
      $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
    }
  }
});