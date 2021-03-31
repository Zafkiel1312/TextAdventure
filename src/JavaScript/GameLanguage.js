function startGame() {
    //----------------------------------------------------------------------------------------------------------------------------
    //Definition der Sprache
/*
    let arr = [];

    arr.push(new Rule("A", ["a", "A"], "Du findest eine weitere Weggabelung. Möchtest du nach Rechts (a) oder nach links (b) gehen?"));
    arr.push(new Rule("A", ["a", "B"], "Du findest ein Haus am Wegesrand. Möchtest du hineingehen (a) oder möchtest du es ignorieren und weitergehen (b)?"));
    arr.push(new Rule("A", ["b", "C"], "Du findest einen Fluss. Weit entfernst siehst du etwas, was wie eine Brücke aussieht. Möchtest du zu dieser Brücke gehen (a) oder einfach durch den Fluss schwimmen (b)?"));
    arr.push(new Rule("A", ["b", "D"], "Du triffst auf eine Sackgasse. Möchtest du zurück zur Weggabelung gehen (a) oder möchtest du hier warten (b)?"));

    arr.push(new Rule("B", ["a", "E"], "Du entdeckst eine Truhe. möchtest du sie öffnen (a) oder willst du sie ignorieren (b)?"));
    arr.push(new Rule("B", ["b", "A"], "Du ignorierst das Haus und gehst weiter. Du triffst auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder nach links (b) gehen?"));

    arr.push(new Rule("C", ["a", "A"], "Du gehst über die Brücke. Auf der anderen Seite triffst du auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder nach links (b) gehen?"));
    arr.push(new Rule("C", ["b", "C"], "Du versuchst durch den Fluss zu schwimmen, ertrinkst aber fast. Du kannst dich grade noch so an das Ufer retten. Möchtest du doch zur Brücke gehen (a) oder willst du es nochmal probieren (b)?", -50));
    arr.push(new Rule("C", ["b", "A"], "Du schwimmst erfolgreich durch den Fluss. Auf der anderen seite triffst du auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder nach links (b) gehen?", 50));

    arr.push(new Rule("D", ["a", "A"], "Du gehst zurück zur Weggabelung und nimmst den anderen Weg. Dort triffst du auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder nach links (b) gehen?"));
    arr.push(new Rule("D", ["a", "B"], "Du gehst zurück zur Weggabelung und nimmst den anderen Weg. Dort entdeckst du ein Haus. Möchtest du hinein gehen (a) oder willst du es ignorieren und weiter gehen (b)?"));
    arr.push(new Rule("D", ["b", "D"], "Du entscheidest dich dazu, etwas zu warten. Nach einer weile Überlegst du, ob du nicht doch zurückgehen solltest (a) oder ob du noch weiter wartest (b)."));
    arr.push(new Rule("D", ["b", "F"], "Nachdem du eine weile gewartet hast, schläfst du ein. Wann wirst du wohl wieder aufwachen (a)?"));

    arr.push(new Rule("E", ["a", "A"], "Du öffnest die Truhe. In der Truhe findest du etwas Geld. Freudig gehst du aus dem Haus raus und folgst weiter dem Weg. Nach einer Weile triffst du auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder links (b) gehen?", 50));
    arr.push(new Rule("E", ["a", "A"], "Du öffnest die Truhe, aber die sie ist leer. Traurig verlässt du das Haus und folgst weiter dem Weg. Nach einer Weile triffst du auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder links (b) gehen?", -50));
    arr.push(new Rule("E", ["b", "A"], "Du entscheidest dich dagegen, unschuldige Leute zu beklauen und verlässt das Haus. Mit einem guten Gewissen folgst du nun weiter dem Weg und triffst auf eine weitere Weggabelung. Möchtest du nach rechts (a) oder links (b) gehen?", 25));

    arr.push(new Rule("F", ["a", "B"], "Nach einer Weile wachst du auf. Du fühlst dich komplett ausgeschlafen und bist hoch motiviert. In der ferne siehst du ein Haus, welches dir vorher nicht aufgefallen ist. Du begibst dich zu den Haus und stehst nun vor der entscheidung, ob du hinein gehst (a) oder einfach weiter dem Weg neben dem Haus folgst (b).", 50));
    arr.push(new Rule("F", ["a", "C"], "Nach einem unruhigen Schlaf wachst du auf und stellst erschrocken fest, dass du beklaut wurdest. Aus frust gehst du zu dem naheliegenden fluss und trinkst dort etwas Wasser. In der Ferne entdeckst du eine Brücke. Möchtest über die Brücke gehen (a) oder willst du durch den Fluss schwimmen (b)?", -50));


    let l = new Language("Testsprache", arr, "Du bist ein Wanderer auf Reisen und triffst auf eine Weggabelung. Du kannst nach rechts (a) oder nach links (b) gehen. Wofür entscheidest du dich?");
*/
    //Ende Sprach-Definition
    //----------------------------------------------------------------------------------------------------------------------------------------------------


    getAllLanguages().then(function(data) {
        data.forEach(function(name) {
            //let idDropdown = 'myDropdown', idOuterDiv = 'outerDiv', idOuterBtn = 'outerBtn', idDropdownBtn = 'dropdownBtn';
            let idOuterDiv = 'outerDiv' + name;
            let idOuterBtn = 'outerBtn' + name;
            let idDropdown = 'myDropdown' + name;
            let idDropdownBtn = 'dropdownBtn' + name;


            $("#language").append("<div class='dropdown' id='" + idOuterDiv + "'> </div>");
            //console.log(idOuterDiv);
            $("#" + idOuterDiv).append("<button id='" + idOuterBtn + "' class='dropbtn'>" + name + " </button>")
                .append("<div id='" + idDropdown + "' class='dropdown-content'></div>");

            $("#" + idOuterBtn).on('click', function() {
                myFunction(idDropdown);
            });

            $("#" + idDropdown).append("<button id='" + idDropdownBtn + "' class='dropdown-button'>spielen</button>");

            $("#" + idDropdownBtn).on('click', function() {
                chooseLanguage(name);
            })
        });
    },
        function(reason) {
            $(".labelgamecontent").text("Verbindung zum Server nicht möglich");
            console.log(reason);
        });

     /*
        <div class="dropdown" >
            <button onclick="myFunction()" class="dropbtn">Game1</button>
            <div id="myDropdown" class="dropdown-content">
                <button id="b1" class="dropdown-button">spielen</button>
            </div>
        </div> */
}


function refreshLeaderboard(l) {
    $(".leaderboardeintrag").remove();
    let i = 0;
    l.getLeaderBoard().forEach(function(entry) {
        i++;
        $("#scoreboard").append("<tr class='leaderboardeintrag'>" +
            "<td>" + i + "</td>" +
            "<td>" + entry["name"] + "</td>" +
            "<td>" + entry["points"] + "</td>" +
            "</tr>");
    });
}


function chooseLanguage(name) {
    $(".labelgamecontent").remove();
    $("#divgamecontent > br").remove();
    $("#divgamecontent").append('<label class="labelgamecontent">Bitte warten Sie kurz <!label><br>');
    $("#inputgame").val("")
        .off("keydown");
    $(".score").text("Punkte: 0");
    $(".labelgamecontent").text("Bitte warten Sie kurz");

    getLanguageJson(name).then(function(json) {
        let l = Language.parse(json);

        $("#textadventuregameueber").text(l.getName());

        refreshLeaderboard(l);


        $(".labelgamecontent").text(l.getEventText())
            .append("<br>");

        $("#inputgame").on("keydown", function (e) {
            if (e.key === "Enter") {
                let nt = $(this).val();
                if (nt === "!restart") {
                    l = Language.parse(JSON.parse(JSON.stringify(l)));

                    $(".labelgamecontent").remove();
                    $("#divgamecontent > br").remove();
                    $("#divgamecontent").append('<label class="labelgamecontent">' + l.getEventText() + '<!label><br>');
                    $(this).val("");
                    $(".score").text("Punkte: 0");
                } else {
                    if (l.chooseRule(nt)) {
                        $("#divgamecontent").append('<label class="labelgamecontent">' + nt + '<!label><br>')
                            .append('<label class="labelgamecontent">' + l.getEventText() + '<!label><br>');
                        $(this).val("");
                        $(".score").text("Punkte: " + l.getPoints());
                    } else if (!l.isFinished()){
                        $("#divgamecontent").append('<label class="labelgamecontent">' + nt + ' ist keine gültige Eingabe.<!label><br>');
                        $(this).val("");
                    } else {
                        l.addToLeaderBoard(nt, l.getPoints())
                        sendJson(JSON.stringify(l)).then(function() {
                                $(".labelgamecontent").remove();
                                $("#game > br").remove();
                                $("#divgamecontent").append('<label class="labelgamecontent">Bitte warten Sie kurz</label><br>');
                                $("#inputgame").val("")
                                    .attr("placeholder", "Was möchtest du tun?");
                                $(".score").text("Punkte: 0");
                                $(".labelgamecontent").text("Bitte warten Sie kurz");
                                getLanguageJson(l.getName()).then(function(json) {
                                        l = Language.parse(json);

                                        refreshLeaderboard(l);


                                        $(".labelgamecontent").text(l.getEventText())
                                            .append("<br>");
                                    },
                                    function(reason) {
                                        $("#divgamecontent").append('<label class="labelgamecontent">Verbindung zum Server unterbrochen</label><br>');
                                        console.log(reason);
                                    })
                            },
                            function(reason) {
                                $("#divgamecontent").append('<label class="labelgamecontent">Verbindung zum Server unterbrochen</label><br>');
                                console.log(reason);
                            });
                    }
                }
                if (l.isFinished()) {
                    $("#inputgame").attr("placeholder", "Geben Sie Ihren Namen ein.");
                    $("#divgamecontent").append('<label class=labelgamecontent>Game Over! Geben Sie einen Namen ein, welcher auf dem Leaderboard erscheinen soll.</label>')
                }
            }
        });
    },
    function(reason) {
        $(".labelgamecontent").text("Verbindung zum Server unterbrochen");
        console.log(reason);
    });
}




