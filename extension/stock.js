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
    }).fail(function (response) {
        return false;
    });
};

function addStock(symbol, res) {
    var currentValue = res["close"];
    var currentChange = res["change"];
    var currentChangePerc = res["changePercent"];

    var data = `${symbol}: ${currentValue} USD`;
    if (listStocks[symbol]) { return; }
    var variance = `${currentChange} (${currentChangePerc}%)`;

    var isNeg = false;
    if (currentChange < 0) {
        isNeg = true;
    }
    listStocks[symbol] = { "data": data, "variance": variance, "isNeg": isNeg };
    populateListHtml(listStocks);
}

function getProcessedSpans(key) {
    var value = listStocks[key];
    var symbol = value["data"];
    var variance = value["variance"];

    var divContainer = $("<div id='containerStock'></div>");
    var spanSymbol = $(`<span>${symbol}&nbsp</span>`).css("color", "inherit");
    var spanVariance = $(`<span>${variance}</span>`);
    var spanClose = $(`<span>&nbspX</span>`).css("color", "black").bind("click", removeSymbol);

    var isNeg = value["isNeg"];
    if (isNeg) {
        spanVariance.css("color", "red");
    }
    else {
        spanVariance.css("color", "green");
    }
    divContainer.append(spanSymbol).append(spanVariance).append(spanClose);

    return divContainer;
}

function removeSymbol(span) {
    var data = span.currentTarget.parentElement.children[0].innerHTML;
    var symbol = data.split(":")[0];
    delete listStocks[symbol];
    span.currentTarget.parentElement.parentElement.remove();
}

function populateListHtml(list) {
    $("#stock-list").empty();
    var i = 0; //this needs to disappear
    Object.keys(listStocks).forEach(function (key) {
        var divContainer = getProcessedSpans(key);
        var listItem = $("<li class='mdl-list__item'></li>").append(divContainer);
        if (i != 0) {
            listItem.hide();
        }
        i++;
        $("#stock-list").append(listItem);
    });
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

function getAllSymbols() {
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
        Object.keys(response).forEach(function (key) {
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

