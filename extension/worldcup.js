$(document).ready(function () {
    $.ajax({
        url: `https://myproxi.herokuapp.com/http://api.football-data.org/v1/competitions/467/fixtures`,
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function (response) {
            // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
            // $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
            console.log(response.fixtures[0]);
        },
        error: function () {
            // $('#errors').text("There was an error processing your request. Please try again.")
            console.log('error');
            
        }
    });
});