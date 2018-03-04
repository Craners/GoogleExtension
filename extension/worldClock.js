// var x3 = moment.tz.names(); // ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", ...]
var listOfTimes=[];
var def = moment.tz.guess();
listOfTimes.push(def);
var m = moment();
m.format();// 2013-11-18T11:55:00-05:00
listOfTimes.push(m);
var x = m.tz("Europe/Berlin").format(); // 2013-11-18T06:00:00+01:00
x = moment(x,"Y-MM-DD HH:mm");   // parsed as 4:30 local time
var x2 = m.tz("America/Toronto").format(); // 2013-11-18T06:00:00+01:00
x2 = moment(x2,"+-HH:mm");   // parsed as 4:30 local time
// newYork.format();// 2014-06-01T12:00:00-04:00
$("#worldClockTime").html(x2._i);
$('#worldClockTime').attr("data-index", "bar");
console.log(listOfTimes);


function ShowWorldClock(){

//  console.log($("#worldClockTime"));   
}

$( "#worldClockTime" ).click(function() {
    alert( "Handler for .click() called." );
    ShowWorldClock();
  });