$(document).ready(function () {

  if (GetLocal("BackGround") === "") {

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');
    var rand = Math.floor((Math.random() * 10) + 1);

    var obj = {

      "today": day,
      "randomNumber": rand
    }
    SaveOneOnly('BackGround', obj);
    $('.layout-transparent').css('background-image', 'url(' + `../background/${rand}.jpg` + ')');
  } else {

    var data = GetLocal("BackGround");
    var x = data.length-1;
    data = data[x];

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');

    if (data.today == day) {

      $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
    }
    else {

      var rand = Math.floor((Math.random() * 10) + 1);
      data.today = day;
      data.randomNumber = rand;

      SaveOneOnly('BackGround', data);
      $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
    }
  }
});