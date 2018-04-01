function switchVisibility(switchId, elementId) {
    $('#' + switchId)[0].MaterialSwitch.on();

    $('#' + switchId + ' input').change(function () {
        $("#" + elementId).toggle();
    });
}

$(document).ready(function () {
    switchVisibility("checkWeather", "weather-card");
    switchVisibility("checkClock", "clockTable");
    switchVisibility("checkStock", "stock");
});