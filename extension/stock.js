var apiKey = "7YIT0H0H47ROMK81";
var currentIndexList = -1;
var sizeList;
var stockResponses = [];
var listStocks = [];
var symbols = [];

function getStockData(symbol, async, outputsize = "compact") {
    var query = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputsize}&apikey=${apiKey}&datatype=json`;

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
        // var index = response["Meta Data"]["2. Symbol"];
        // var data = response["Time Series (Daily)"];

        if (!stockResponses.includes(response)) {
            stockResponses.push(response);
        }
        // var dataArr = Object.keys(data).map(function (key) { return data[key]; });
        // var newestVal = round2Decimals(dataArr[0]["4. close"]);
        // var yesterdayVal = dataArr[1]["4. close"];
        // var diff = getVariation(newestVal, yesterdayVal);
        // var perc = getPercentage(diff, yesterdayVal);
        // var index = `${index}: ${newestVal} USD`;
        // var variance = `${diff} (${perc}%)`;

        // var isNeg = false;
        // if (diff < 0) {
        //     isNeg = true;
        // }
        // listStocks.push({ "index": index, "variance": variance, "isNeg": isNeg });
        return true;
    });

    $.ajax(settings).fail(function (response) {
        return false;
    });
};

function addStock(response) {
    var index = response["Meta Data"]["2. Symbol"];
    var data = response["Time Series (Daily)"];

    var dataArr = Object.keys(data).map(function (key) { return data[key]; });
    var newestVal = round2Decimals(dataArr[0]["4. close"]);
    var yesterdayVal = dataArr[1]["4. close"];
    var diff = getVariation(newestVal, yesterdayVal);
    var perc = getPercentage(diff, yesterdayVal);
    var index = `${index}: ${newestVal} USD`;
    var variance = `${diff} (${perc}%)`;

    var isNeg = false;
    if (diff < 0) {
        isNeg = true;
    }
    listStocks.push({ "index": index, "variance": variance, "isNeg": isNeg });
}


function getVariation(newestVal, yesterdayVal) {
    if (newestVal >= yesterdayVal) {
        return round2Decimals(newestVal - yesterdayVal);
    }
    else {
        return round2Decimals(yesterdayVal - newestVal) * (-1);
    }
}

function getPercentage(variation, origNr) {
    var perc = variation / origNr * 100;
    return round2Decimals(perc);
}

function round2Decimals(number) {
    return Math.round(number * 100) / 100;
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
    source: function (req, res) {
        $.ajax({
            url: "http://d.yimg.com/aq/autoc?region=US&lang=en-US",
            data: { query: req.term },
            success: function (data) {
                stockResponses = [];                
                var items = [];
                data.ResultSet.Result.forEach(function (item) {
                    if (getStockData(item.symbol), true) {
                        items.push(`${item.symbol}, ${item.name}`);
                    }
                });
                res(items);
            },
            select: function (event, ui) {
                console.log(stockResponses);
                console.log(ui.item);
            }
        });
    },
    minLength: 2,
    select: function (event, ui) {
        console.log(ui.item);
    }
};

$(document).ready(function () {
    getStockData("MSFT", false);
    addStock(stockResponses[0]);
    // getStockData("FB");
    // getStockData("AAPL");
    // getStockData("GOOGL");
    // getStockData("IXIC");
    // getStockData("VIX");
    sizeList = listStocks.length;
    populateListHtml(listStocks);
    bindClickListenerList();
    showAutoComplete("#addStock", autoComplete);
});

