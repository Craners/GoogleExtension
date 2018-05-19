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
    var switchStatus = GetLocal("switch");
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
    });
});