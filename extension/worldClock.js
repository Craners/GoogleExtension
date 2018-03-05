// var x3 = moment.tz.names(); // ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", ...]
var listOfTimes=[];
var def = moment.tz.guess(); //guess where they are?
var m = moment();
m.format();
listOfTimes.push(m);
var x1 = m.tz(def).format(); // 2013-11-18T06:00:00+01:00
x1 = moment(x1);   // parsed as 4:30 local time
listOfTimes.push(x1);
var x2 = m.tz("America/Toronto").format(); // 2013-11-18T06:00:00+01:00
x2 = moment(x2);   // parsed as 4:30 local time
listOfTimes.push(x2);
$("#worldClockTime").html(x2._i);
$('#worldClockTime').attr("data-index", listOfTimes.indexOf(x2));
console.log(listOfTimes);


function ShowWorldClock(){

  var current  = parseInt($('#worldClockTime').attr("data-index"));
  var rand = 0;
  if(current == listOfTimes.length-1){

    rand = 1;
  }else{

    rand = current+1
  }
  $("#worldClockTime").html(listOfTimes[rand]._i);
  $('#worldClockTime').attr("data-index", rand);
}

$( "#worldClockTime" ).click(function() {
    ShowWorldClock();
  });