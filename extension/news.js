var endsJpg = /.*.jpg/
var loaded = false;
var format = /[<>_{}]/;

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

function addDefaultChip(name, url) {
    var spanMainChip = $('<span></span>').addClass('mdl-chip chip-style');
    var spanNestedChip = $('<span></span>').addClass('mdl-chip__text').text(name);
    spanMainChip.append(spanNestedChip);

    spanMainChip.click(function () {
        var savedSources = GetLocal("news");
        if ($.inArray(url, savedSources) === -1) {
            getRssFeed(url);
        }
    });

    $("#drawerChips").append(spanMainChip);
}

function addSource(title) {
    var h5SourceTitle = $("<h5></h5>").addClass('titleRss').text(title);

    $('#drawerContent').append(h5SourceTitle);
}

function addCard(data) {

    var thumbnail = data['thumbnail'];
    var title = data['title'];
    var linkFullArticle = data['link'];
    var description = data['description'].substring(0, 100);

    var divMain = $("<div></div>").addClass('demo-card-square mdl-card mdl-shadow--2dp');
    divMain.attr('id', 'newsCards');

    if (endsJpg.test(thumbnail)) {
        var divTitle = $("<div></div>").addClass('mdl-card__title mdl-card--expand thumbnailRss').css('background-image', `url(${thumbnail})`);
    }
    var h6InTitle = $("<h6></h6>").addClass('titleRss').html(title);

    var divSupportingText = $('<div></div>').addClass('mdl-card__supporting-text').text('No description');
    if (!format.test(description)) {
        divSupportingText.html(description + '...');
    }
    divSupportingText.attr('id', 'divSupportingText');

    var divActions = $('<div></div>').addClass('mdl-card__actions mdl-card--border');
    var aInDivActions = $('<a></a>').attr("href", linkFullArticle).attr('target', '_blank').text("Full Article");

    divActions.append(aInDivActions);

    divMain.append(divTitle);
    divMain.append(h6InTitle);
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
        for (i = 0; i < 5; i++) {
            var element = response["items"][i];
            addCard(element);
        }
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

    addDefaultChip("BBC UK", "http://feeds.bbci.co.uk/news/rss.xml?edition=uk#");
    addDefaultChip("BBC Sports", "http://feeds.bbci.co.uk/sport/football/rss.xml?edition=int#");
    addDefaultChip("The Verge", "https://www.theverge.com/rss/index.xml");
    addDefaultChip("TechCrunch", "http://feeds.feedburner.com/TechCrunch/");
    addDefaultChip("Hacker News", "https://news.ycombinator.com/rss");
});