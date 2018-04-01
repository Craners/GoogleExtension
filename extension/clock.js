function update() {
        $('.date').html(moment().format('dddd MMMM YYYY'));
        $('.hours').html(moment().format('H:mm:ss'));        
}
$(document).ready(function () {

        update();
        setInterval(update, 1000);
});