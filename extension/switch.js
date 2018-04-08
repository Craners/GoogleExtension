function switchVisibility(switchId, elementId) {
    
    $('#' + switchId + ' input').change(function () {
        $("#" + elementId).toggle();
    });
}

$(document).ready(function () {
    switchVisibility("checkWeather", "weather-card");
    switchVisibility("checkClock", "clockTable");
    switchVisibility("checkStock", "stockTable");
});