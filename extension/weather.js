var latitude = 0;
var longitude = 0;

function createExpirationDate() {
  var newDateObj = moment(new Date()).add(60, 'm').toDate();
  return newDateObj;
}

function setWeatherInView(weatherData) {
  $("#weather-image").addClass(`wi-owm-${weatherData["Icon"]}`);
  $("#weather-description").html(weatherData["Description"]);
  $("#weather-location").html(weatherData["Location"]);
  $("#weather-humidity").html(weatherData["Humidity"]);
  $("#weather-temp").html(weatherData["Temperature"]);
  $("#weather-tempMin").html(weatherData["TemperatureMin"]);
  $("#weather-tempMax").html(weatherData["TemperatureMax"]);
}

function getWeather() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=86c75ec64e0f4f15ec09923d141350f9`,
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    var icon = response["weather"][0]["id"];
    var description = response["weather"][0]["description"];
    var location = response["name"];
    var country = response["sys"]["country"];
    var temperature = response["main"]["temp"];
    var humidity = response["main"]["humidity"];
    var tempMin = response["main"]["temp_min"];
    var tempMax = response["main"]["temp_max"];

    var expirationDate = createExpirationDate();
    var weatherData = {};
    weatherData["Icon"] = icon;
    weatherData["Description"] = description;
    weatherData["Location"] = `${location}, ${country}`;
    weatherData["Humidity"] = `H: ${humidity}%`;
    weatherData["Temperature"] = `Temperature: ${Math.ceil(temperature)} &deg;C`;
    weatherData["TemperatureMin"] = `Min: ${tempMin} &deg;C`;
    weatherData["TemperatureMax"] = `Max: ${tempMax} &deg;C`;
    var weatherObj = {};
    weatherObj["ExpirationDate"] = expirationDate;
    weatherObj["WeatherData"] = weatherData;
    SaveOneOnly("weather", weatherObj);
    setWeatherInView(weatherData);

  });
}

function getCity() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`,
    "method": "GET"
  }

  var city;
  $.ajax(settings).done(function (response) {
    var responseData = response["results"][0];
    if (responseData === undefined) { return; }
    else {
      var components = responseData["address_components"];
      city = `${components[4]["short_name"]},${components[6]["short_name"]}`
      $("#weather-location").html(city);
    }
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
  }
  else {
    return;
  }

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather();
    getCity();
  }

  function fail(error) {
    console.log("coordinates could not be obtained.");
    return;
  }
}

$(document).ready(function () {
  var weatherObj = GetLocal("weather");
  if (weatherObj === '') {
    getLocation();
  }
  else {
    var momentDate = moment(weatherObj[0]["ExpirationDate"]).toDate();
    var currentDate = moment(new Date()).toDate();
    if (currentDate >= momentDate) {
      getLocation();
    }
    else {
      var weatherData = weatherObj[0]["WeatherData"];
      setWeatherInView(weatherData);
    }
  }
});

