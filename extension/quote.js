var check = moment(moment(), 'YYYY/MM/DD');
var day = check.format('D');
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://myproxi.herokuapp.com/https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
    "method": "GET",
    "headers": {
        "X-Mashape-Key": "uHYXN0iDX2msh3Dr840maf1RReRVp1Ij8AkjsndcEza97O1w9m",
        "Cache-Control": "no-cache",
        "Postman-Token": "93571d11-013a-4bfb-bf71-0f6032f9b53a"
    }
}

function displayQuote(obj) {

    $('#quoteTxt').html('"' + obj.quote + '"');
    $('#quoteAuth').html('- ' + obj.author);
    $('#quoteAuth').hide();
}

function CallQuote() {

    $.ajax(settings).done(function (response) {

        var obj = {
            author: response[0].author,
            category: response[0].category,
            quote: response[0].quote,
            day: day
        };
        SaveOneOnly("quote", obj);
        displayQuote(obj);
    });
}


$("#quote").hover(function () {

    $('#quoteAuth').toggle(200);
});

$(document).ready(function () {

    var data = GetLocal("quote");
    var x = data.length - 1;
    data = data[x];

    if (data === undefined) {
        
        CallQuote();
    }
    else {

        if (data.day == day) {

            displayQuote(data);
        }
        else {

            CallQuote();
        }
    }
});