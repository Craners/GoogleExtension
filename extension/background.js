$(document).ready(function () {

// var settings = {
//   "async": true,
//   "url": "https://s3.amazonaws.com/123rf-chrome/",
//   "method": "GET",
//   "headers": {
//     "Cache-Control": "no-cache",
//     "Postman-Token": "0cd86039-5e48-05d8-2e68-dcfc89b062f8"
//   }
// }

// $.ajax(settings).done(function (response) {
if (GetLocal("BackGround")==="") {

  var rand = Math.floor((Math.random() * 24) + 1);
  console.log(rand);
  
  // SaveLocal('BackGround', rand);
  
}
// $('.layout-transparent').css('background-image', 'url(' + x + ')');


  // var xml = response,
  // $xml = $( xml ),
  // $title = $xml.find( "Key" ).eq(rand);
  // var x = 'https://s3.amazonaws.com/123rf-chrome/'+ $title.text();
//  $('#back').css('background-image', 'url(' + x + ')');
// });
  // $('.layout-transparent').css('background-color', 'blue');
});