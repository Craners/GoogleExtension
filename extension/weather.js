var latitude = 0;
var longitude = 0;

function getWeather()
{
  var settings = {
    "async": true,
    "url": `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`,
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache",
      "Postman-Token": "0cd86039-5e48-05d8-2e68-dcfc89b062f8"
    }
  }

  $.ajax(settings).done(function (response) {
    var icon = response["weather"]["icon"];
    var location = response["name"];
    var country = response["sys"]["country"];
    var temperature = response["main"]["temp"];
    var humidity = response["main"]["humidity"];
    var tempMin = response["main"]["temp_min"];
    var tempMax = response["main"]["temp_max"];

    $("#weather-image").css("src", icon);
    $("#weather-location").html(`${location}, ${country}`);
    $("#weather-humidity").html(`H: ${humidity}%`);
    $("#weather-temp").html(`Temperature: ${Math.ceil(temperature)} &deg;C`);
    $("#weather-tempMin").html(`Min: ${tempMin} &deg;C`);
    $("#weather-tempMax").html(`Max: ${tempMax} &deg;C`);
  });
}

function getLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(success);
  }
  else {
    return;
  }

  function success(position)
  {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather();
  }
}

getLocation();
