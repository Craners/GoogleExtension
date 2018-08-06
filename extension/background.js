$(document).ready(function () {

  // $('.layout-transparent').css('background-image', 'url(' + `../background/1.jpg` + ')');
  // $('.layout-transparent').css('background-image', 'url(' + 'https://amirk.herokuapp.com/images/back.jpg' + ')');
  // $('.layout-transparent').animate({ opacity: 1 }, { duration: 'slow' });
  if (GetLocal("BackGround") === "") {

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');
    var rand = Math.floor((Math.random() * 8) + 1);

    var obj = {

      "today": day,
      "randomNumber": rand
    }
    SaveOneOnly('BackGround', obj);
    $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
    $('.layout-transparent').animate({ opacity: 1 }, { duration: 'slow' });
  } else {

    var data = GetLocal("BackGround");
    var x = data.length - 1;
    data = data[x];

    var check = moment(moment(), 'YYYY/MM/DD');
    var day = check.format('D');

    if (data.today == day) {

      $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
      $('.layout-transparent').animate({ opacity: 1 }, { duration: 'slow' });
    }
    else {

      var rand = Math.floor((Math.random() * 8) + 1);
      data.today = day;
      data.randomNumber = rand;

      SaveOneOnly('BackGround', data);
      $('.layout-transparent').css('background-image', 'url(' + `../background/${data.randomNumber}.jpg` + ')');
      $('.layout-transparent').animate({ opacity: 1 }, { duration: 'slow' });

    }
  }
});

