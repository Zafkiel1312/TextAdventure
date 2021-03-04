function startGame() {
    //----------------------------------------------------------------------------------------------------------------------------
    //Definition der Sprache

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

    //Ende Sprach-Definition
    //----------------------------------------------------------------------------------------------------------------------------------------------------

    $(".labelgamecontent").text(l.getEventText());

    $("#inputgame").on("keydown",function(e) {
        if (e.key === "Enter") {
            let nt = $(this).val();
            if (nt === "!restart") {
                l = new Language("Testsprache", arr, "Du bist ein Wanderer auf Reisen und triffst auf eine Weggabelung. Du kannst nach rechts (a) oder nach links (b) gehen. Wofür entscheidest du dich?");

                $(".labelgamecontent").remove();
                $("#game > br").remove();
                $(this).before('<label class="labelgamecontent">' + l.getEventText() + '<!label><br>');
                $(this).val("");
            } else {
                if (l.chooseRule(nt)) {
                    $(this).before('<label class="labelgamecontent">' + nt + '<!label><br>');
                    $(this).before('<label class="labelgamecontent">' + l.getEventText() + '<!label><br>');
                    $(this).val("");
                } else {
                    $(this).before('<label class="labelgamecontent">' + nt + ' ist keine gültige Eingabe.<!label><br>');
                }
            }
        }
    });
}