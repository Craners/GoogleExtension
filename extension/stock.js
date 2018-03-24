var listStocks = {};
var allSymbols = [];

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

    var data = `${symbol}`;
    var currentValue = `${currentValue} USD`;
    if (listStocks[symbol]) { return; }
    var variance = `${currentChange} (${currentChangePerc}%)`;

    var isNeg = false;
    if (currentChange < 0) {
        isNeg = true;
    }
    listStocks[symbol] = { "data": data, "value": currentValue, "variance": variance, "isNeg": isNeg };
    populateListHtml(listStocks);
}

function getBodyStocks(key) {
    var value = listStocks[key];
    var symbol = value["data"];
    var currentVal = value["value"];
    var variance = value["variance"];

    var trContainer = $("<tr></tr>");
    var tdSymbol = $(`<td class="mdl-data-table__cell--non-numeric">${symbol}</td>`).css("color", "inherit");
    var tdValue = $(`<td>${currentVal}</td>`);
    var tdVariance = $(`<td>${variance}</td>`);
    var tdClose = $(`<td><i class="material-icons md-18">&#xE5CD;</i></td>`).css("color", "black").bind("click", removeSymbol);

    var isNeg = value["isNeg"];
    if (isNeg) {
        tdVariance.css("color", "red");
    }
    else {
        tdVariance.css("color", "green");
    }
    trContainer.append(tdSymbol).append(tdValue).append(tdVariance).append(tdClose);

    return trContainer;
}

function removeSymbol(row) {
    var symbol = row.currentTarget.parentElement.children[0].innerHTML;
    delete listStocks[symbol];
    row.currentTarget.parentElement.remove();
    // localStorage.setItem("stocks", JSON.stringify(listStocks));
    if (Object.keys(listStocks).length == 0) {
        applyDefaultStock();
    }
}

function populateListHtml(list) {
    $("#stockTableBody").empty();
    Object.keys(list).forEach(function (key) {
        var trContainer = getBodyStocks(key);
        $("#stockTableBody").append(trContainer);
    });
}

var autoComplete = {
    source: allSymbols,
    minLength: 3,
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
            allSymbols.push(`${value.symbol}, ${value.name}`);
        });
    });
}

function applyDefaultStock() {
    var def = $(`<tr><th class="defaultStock" colspan="4">No stock</th></tr>`);
    $("#stockTableBody").append(def);
}

function addStocksFromLocalStorage() {
    var stocks = JSON.parse(localStorage.getItem("stocks"));
    if(stocks && Object.keys(stocks).length != 0)
    {
        Object.keys(stocks).forEach(function(key){
            var value = stocks[key];
            getStockData(value, false);
        });
    }
    else
    {
        applyDefaultStock();
    }
}

$(document).ready(function () {
    getAllSymbols();
    addStocksFromLocalStorage();
    showAutoComplete("#addStock", autoComplete);
});

$(window).on("unload", function(e) {
    localStorage.setItem("stocks", JSON.stringify(Object.keys(listStocks)));
});
