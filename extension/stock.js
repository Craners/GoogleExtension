var apiKey = "7YIT0H0H47ROMK81";
var currentIndexList = -1;

var listStocks = [];
var symbols = [];

function getStockData(symbol, async, outputsize = "compact") {
    var query = `https://api.iextrading.com/1.0/stock/${symbol}/chart/`;

    var settings = {
        "async": async,
        "url": query,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "0cd86039-5e48-05d8-2e68-dcfc89b062f8"
        }
    }

    $.ajax(settings).done(function (response) {        
        var lastIndex = response[Object.keys(response).length - 1];
        addStock(symbol, lastIndex);
        return true;
    }).fail(function(response) {
        return false;
    });
};

function addStock(symbol, res) {
    var currentValue = res["close"];
    var currentChange = res["change"];
    var currentChangePerc = res["changePercent"];

    var index = `${symbol}: ${currentValue} USD`;
    var variance = `${currentChange} (${currentChangePerc}%)`;

    var isNeg = false;
    if (currentChange < 0) {
        isNeg = true;
    }
   listStocks.push({ "index": index, "variance": variance, "isNeg": isNeg });
   populateListHtml(listStocks);
}

function getProcessedSpans(item) {
    var index = item["index"];
    var variance = item["variance"];

    var spanIndex = $(`<span>${index}&nbsp</span>`).css("color", "inherit");
    var spanVariance = $(`<span>${variance}</span>`);

    var isNeg = item["isNeg"];
    if (isNeg) {
        spanVariance.css("color", "red");
    }
    else {
        spanVariance.css("color", "green");
    }

    return { "spanIndex": spanIndex, "spanVariance": spanVariance };
}


function populateListHtml(list) {
    $("#stock-list").empty();
    var i;
    for (i = 0; i < list.length; i++) {
        var item = list[i];
        var spans = getProcessedSpans(item);
        var listItem = $("<li class='mdl-list__item'></li>").append(spans["spanIndex"]).append(spans["spanVariance"]);
        if (i != 0) {
            listItem.hide();
        }
        $("#stock-list").append(listItem);
    }
}

function bindClickListenerList() {
    var stocksUl = $("#stock-list");
    stocksUl.click(function () {
        var children = $(this).children();
        var i;
        for (i = 1; i < children.length; i++) {
            $(children[i]).toggle(500);
        }
    });

}

var autoComplete = {
    source: symbols,
    minLength: 2,
    select: function (event, ui) {
        var split = ui.item.label.split(",");
        var symbol = split[0];
        getStockData(symbol, true);
        stockResponses = [];
    }
};

function getAllSymbols()
{
    var settings = {
        "async": true,
        "url": "https://api.iextrading.com/1.0/ref-data/symbols",
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "0cd86039-5e48-05d8-2e68-dcfc89b062f8"
        }
    }

    $.ajax(settings).done(function (response) {      
        Object.keys(response).forEach(function(key) {
            var value = response[key];
            symbols.push(`${value.symbol}, ${value.name}`);
        });
    });
}

$(document).ready(function () {
    getAllSymbols();
    getStockData("MSFT", false);
    bindClickListenerList();
    showAutoComplete("#addStock", autoComplete);
});

