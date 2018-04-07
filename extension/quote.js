var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://andruxnet-random-famous-quotes.p.mashape.com/",
    "method": "GET",
    "headers": {
        "X-Mashape-Key": "uHYXN0iDX2msh3Dr840maf1RReRVp1Ij8AkjsndcEza97O1w9m",
        "Cache-Control": "no-cache",
        "Postman-Token": "93571d11-013a-4bfb-bf71-0f6032f9b53a"
    }
}

$.ajax(settings).done(function (response) {
    
    console.log(response);
    var obj;
    obj.author = response[0];

    if (GetLocal("quote")) {

        console.log(obj.author);
    }
    else {

        SaveOneOnly("quote", response);
    }
});
