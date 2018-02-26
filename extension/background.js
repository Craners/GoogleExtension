var settings = {
  "async": true,
  "url": "https://www.flickr.com/photos/daves-f-stop/8079071366",
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "0cd86039-5e48-05d8-2e68-dcfc89b062f8"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
