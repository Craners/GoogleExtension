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

    var data = GetLocal("BackGround")[0];

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');

    if (data.today == day) {

      console.log('its the same day!');
    }
    else {

      var rand = Math.floor((Math.random() * 24) + 1);
      var obj = {

        "today": day,
        "randomNumber": rand
      }
    }
    $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
  }
});