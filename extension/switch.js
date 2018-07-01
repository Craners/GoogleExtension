function switchVisibility(switchId, elementId) {

    $('#' + switchId + ' input').change(function () {
        $("#" + elementId).toggle();
        if ($("#" + elementId).is(":visible")) {
            RemoveFromLocal("switch", elementId);
        }
        else {
            SaveLocal("switch", elementId);
        }
    });
}

function setToggleOff(switchId) {
    $('#' + switchId)[0].MaterialSwitch.off();
}

$(document).ready(function () {
    switchVisibility("checkWeather", "weather-card");
    switchVisibility("checkClock", "clockTable");
    switchVisibility("checkStock", "stockTable");
    switchVisibility("checkSoccer", "soccerTable");
    var switchStatus = GetLocal("switch");
    if (switchStatus.length == 0) { return; }
    switchStatus.forEach(element => {
        $("#" + element).hide();
        if (element == "weather-card") {
            setToggleOff("checkWeather");
        }
        else if (element == "clockTable") {
            setToggleOff("checkClock");
        }
        else if (element == "stockTable") {
            setToggleOff("checkStock");
        }
        else if(element == "soccerTable") {
            setToggleOff("checkSoccer");
        }
    });
});