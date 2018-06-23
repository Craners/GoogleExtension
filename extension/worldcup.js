$(document).ready(function () {
    $.ajax({
        url: `https://myproxi.herokuapp.com/http://api.football-data.org/v1/competitions/467/fixtures`,
        headers: {"X-Auth-Token": "0a47d94773f74ad3b8c7608f419bf593"},
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function (response) {

            var games = response.fixtures;
            var game = [];
            games.forEach(element => {
                var date = moment(element.date);
                var today = moment();
                today = today.format('M') + "/" + today.format('D');
                date = date.format('M') + "/" + date.format('D');
                if (date == today) {

                    game.push(element);
                }
            });
            for (let index = 0; index < game.length; index++) {
                var table = document.getElementById("tableResult");

                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                var txt = document.createTextNode(game[index].homeTeamName);
                if(game[index].result.goalsHomeTeam != null){
                    var txt2 = document.createTextNode(game[index].result.goalsHomeTeam + ":" + game[index].result.goalsAwayTeam);
                }
                else{
                    var txt2 = document.createTextNode("-:-");
                }
                var txt3 = document.createTextNode(game[index].awayTeamName);
                if(game[index].status == "FINISHED"){
                    var txt4 = document.createTextNode("FT");
                }
                else if(game[index].status == "IN_PLAY"){
                    var txt4 = document.createTextNode("Live");
                }
                else{
                    var txt4 = document.createTextNode("Schuduled");
                }

                td.appendChild(txt);
                td2.appendChild(txt2);
                td3.appendChild(txt3);
                td4.appendChild(txt4);

                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                table.appendChild(tr);
            }
            console.log(game);
        },
        error: function () {
            // $('#errors').text("There was an error processing your request. Please try again.")
            console.log('error');

        }
    });
});

function tBodyCreate() {
    var txt1 = "<b>I </b>";                   // Create element with HTML
    var txt2 = $("<i></i>").text("love ");    // Create with jQuery
    var txt3 = document.createElement("b");   // Create with DOM
    txt3.innerHTML = "jQuery!";
    $("img").after(txt1, txt2, txt3);      // Insert new elements after img
}