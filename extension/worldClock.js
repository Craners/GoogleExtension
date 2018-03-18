$(document).ready(function () {

  var listOfTimes = [];
  var InitlistOfTimes =[];
  var dateFormat = 'ddd, MMM D, H:mm'; //<-------- This part will get rid of the warning.
  init();

  function init() {

    listOfTimes = [];
    InitlistOfTimes =[];

    var def = moment.tz.guess(); //guess where they are?
    var m = moment();
    m.format();
    listOfTimes.push(m);

    if (typeof (Storage) !== "undefined") {
      if (localStorage.getItem("data")) {

        InitlistOfTimes = GetLocal('WorldClock');
        InitlistOfTimes.forEach(element => {

          var x1 = m.tz(element).format(dateFormat); // 2013-11-18T06:00:00+01:00
          // var x1 = moment.tz(m, dateFormat, element);
          x1 = moment(x1);   // parsed as 4:30 local time
          listOfTimes.push(x1);
        });
      } else {

        InitlistOfTimes.push(def);
        var x1 = m.tz(def).format(dateFormat); // 2013-11-18T06:00:00+01:00
        x1 = moment(x1);   // parsed as 4:30 local time
        listOfTimes.push(x1);
        SaveLocal('WorldClock', def);

        InitlistOfTimes.push("America/Toronto");        
        var x2 = m.tz("America/Toronto").format(dateFormat); // 2013-11-18T06:00:00+01:00
        x2 = moment(x2);   // parsed as 4:30 local time
        listOfTimes.push(x2);
      }
    } else {
      console.log('local storage not supported');
    }

    let tempCity = listOfTimes[listOfTimes.length - 1];
    let tempCityName = InitlistOfTimes[InitlistOfTimes.length - 1];
    $("#worldClockTime").html(tempCity._i);
    $('#worldClockTime').attr("data-index", listOfTimes.indexOf(tempCity));
    $('#cityInitial').html(tempCityName.substring(tempCityName.indexOf("/") + 1,tempCityName.indexOf("/") + 4));
  }


  function ShowWorldClock() {

    var current = parseInt($('#worldClockTime').attr("data-index"));
    var rand = 0;
    if (current == listOfTimes.length - 1) {

      rand = 1;
    } else {

      rand = current + 1
    }
    $("#worldClockTime").html(listOfTimes[rand]._i);
    $('#worldClockTime').attr("data-index", rand);
    $('#cityInitial').html(InitlistOfTimes[rand-1].substring(InitlistOfTimes[rand-1].indexOf("/") + 1,InitlistOfTimes[rand-1].indexOf("/") + 4));
  }

  $("#worldClockTime").click(function () {
    ShowWorldClock();
  });

  showAutoComplete("#addCity", {
    source: moment.tz.names(),
    minLength: 2,
    select: function (event, ui) {
      // console.log(ui.item ?
      //   "Selected: " + ui.item.value + " aka " + ui.item.id :
      //   "Nothing selected, input was " + this.value);
      ShowSnackBar("Added: " + ui.item.value);
      SaveLocal('WorldClock', ui.item.value);
      init();
    }
  });
});