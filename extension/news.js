var endsJpg = /.*.jpg/
var loaded = false;

$('#notif').click(function () {
    if ($('.mdl-layout__drawer-right').hasClass('active')) {
        $('.mdl-layout__drawer-right').removeClass('active');
    }
    else {
        $('.mdl-layout__drawer-right').addClass('active');
    }

    if (!loaded) {
        var savedSources = GetLocal("news");
        if (savedSources !== '') {
            displaySavedSource(savedSources);
        }
        loaded = true;
    }
});

$('.mdl-layout__obfuscator-right').click(function () {
    if ($('.mdl-layout__drawer-right').hasClass('active')) {
        $('.mdl-layout__drawer-right').removeClass('active');
    }
    else {
        $('.mdl-layout__drawer-right').addClass('active');
    }

});

function addSource(title) {
    var h5SourceTitle = $("<h5></h5>").addClass('titleRss').text(title);

    $('#drawerContent').append(h5SourceTitle);
}

function addCard(data) {

    var thumbnail = data['thumbnail'];
    var title = data['title'];
    var linkFullArticle = data['link'];
    var description = data['description'];

    var divMain = $("<div></div>").addClass('demo-card-square mdl-card mdl-shadow--2dp');

    if (endsJpg.test(thumbnail)) {
        var divTitle = $("<div></div>").addClass('mdl-card__title mdl-card--expand thumbnailRss').css('background-image', `url(${thumbnail})`);
    }
    var h2InTitle = $("<h6></h6>").addClass('titleRss').text(title);

    var divSupportingText = $('<div></div>').addClass('mdl-card__supporting-text').text(description);

    var divActions = $('<div></div>').addClass('mdl-card__actions mdl-card--border');
    var aInDivActions = $('<a></a>').attr("href", linkFullArticle).attr('target', '_blank').text("Full Article");

    divActions.append(aInDivActions);

    divMain.append(divTitle);
    divMain.append(h2InTitle);
    divMain.append(divSupportingText);
    divMain.append(divActions);

    $('#drawerContent').append(divMain);
}

function getRssFeed(url) {
    var apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${url}&api_key=ynt9f6whgpjnobo2e41gtsrjf9txxjathhradoad&count=5`;


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiUrl,
        "method": "GET"
    }

    $.ajax(settings).done(function (response) {
        SaveLocal("news", url);
        addSource(response['feed']['title'])
        response["items"].forEach(element => {
            addCard(element);
        });
    });

}

function displaySavedSource(sources) {
    sources.forEach(element => {
        getRssFeed(element);
    });
}

$(document).ready(function () {
    var dialog = document.querySelector('dialog');
    $('#buttonRss').click(function () {
        dialog.showModal();
    });

    $('#buttonRssCancel').click(function () {
        dialog.close();
    });

    $('#buttonRssOk').click(function () {
        var rssUrlText = $('#rssUrl').val();
        getRssFeed(rssUrlText);
        dialog.close();
    });
});