var settings = {
  "async": true,
  "url": "https://s3.amazonaws.com/123rf-chrome/",
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "0cd86039-5e48-05d8-2e68-dcfc89b062f8"
  }
}

$.ajax(settings).done(function (response) {

  var rand = Math.floor((Math.random() * 100) + 1);
  var xml = response,
  $xml = $( xml ),
  $title = $xml.find( "Key" ).eq(rand);
  var x = 'https://s3.amazonaws.com/123rf-chrome/'+ $title.text();
  $('#back').css('background-image', 'url(' + x + ')');
});
