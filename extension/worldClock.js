$(document).ready(function () {

  var listOfTimes = [];
  var InitlistOfTimes = [];
  var dateFormat = 'ddd, MMM D, H:mm'; //<-------- This part will get rid of the warning.
  init();

  function init() {

    listOfTimes = [];
    InitlistOfTimes = [];

    var def = moment.tz.guess(); //guess where they are?
    var m = moment();
    m.format();
    listOfTimes.push(m);

    if (typeof (Storage) !== "undefined") {
      if (localStorage.getItem("data") && GetLocal('WorldClock') !== '') {

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

    var table = document.getElementById("clockTable");
    $('#rowClock').remove();
    var row = table.insertRow(0);
    row.id = "rowClock";
    $('#rowClock').attr("data-index", listOfTimes.indexOf(tempCity));
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = tempCityName.substring(tempCityName.indexOf("/") + 1);
    cell2.innerHTML = tempCity._i;
  }


  function ShowWorldClock() {

    var current = parseInt($('#rowClock').attr("data-index"));
    var rand = 0;
    if (current == listOfTimes.length - 1) {

      rand = 1;
    } else {

      rand = current + 1
    }

    var table = document.getElementById("clockTable");
    $('#rowClock').remove();
    var row = table.insertRow(0);
    row.id = "rowClock";
    $('#rowClock').attr("data-index", rand);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = InitlistOfTimes[rand - 1].substring(InitlistOfTimes[rand - 1].indexOf("/") + 1);
    cell2.innerHTML = listOfTimes[rand]._i;
  }

  $("#clockTable").click(function () {
    ShowWorldClock();
  });

  showAutoComplete("#addCity", {
    source: moment.tz.names(),
    minLength: 2,
    select: function (event, ui) {
      ShowSnackBar("Added: " + ui.item.value);
      SaveLocal('WorldClock', ui.item.value);
      init();
    }
  });
});

