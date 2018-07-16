function switchVisibility(switchId, elementId) {

    $('#' + switchId + ' input').change(function () {
        $("#" + elementId).toggle();
        if ($("#" + elementId).is(":visible")) {
            RemoveFromLocal("switch", elementId);
            callMainBasedOnTag(elementId);
        }
        else {
            SaveLocal("switch", elementId);
        }
    });
}

function callMainBasedOnTag(tag) {
    switch (tag) {
        case "weather-card":
            mainWeather();
            break;
        case "clockTable":
            mainWorldClock();
            break;
        case "soccerTable":
            mainSoccer();
            break;
        case "stockTable":
            mainStock();
            break;
    }
}

function setToggleOff(switchId) {
    var matSwitchElement = $('#' + switchId)[0].MaterialSwitch;
    if (matSwitchElement !== undefined) {
        matSwitchElement.off();
    }
    else
    {
        window.location.reload(true);
    }
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
        else if (element == "soccerTable") {
            setToggleOff("checkSoccer");
        }
    });
});