$(document).ready(function () {
    $(document).keypress("q", function (e) {
        if (e.ctrlKey)
            localStorage.clear();
    });
});