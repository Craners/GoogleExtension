var latitude = 0;
var longitude = 0;

//every 10 minutes
//get static icons

function getWeather(city)
{
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=86c75ec64e0f4f15ec09923d141350f9`,
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    var icon = response["weather"][0]["icon"];
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

function getCity()
{
  var settings = {
    "async": false,
    "crossDomain": true,
    "url": `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`,
    "method": "GET"
  }

  var city;
  $.ajax(settings).done(function (response) {
    var components = response["results"][0]["address_components"];
    city = `${components[4]["short_name"]},${components[6]["short_name"]}`
  });

  return city;
}

function getLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(success, fail);
  }
  else {
    return;
  }

  function success(position)
  {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var city = getCity();
    getWeather(city);
  }

  function fail(error)
  {
    console.log("coordinates could not be obtained.");
    return;
  }

}

getLocation();
