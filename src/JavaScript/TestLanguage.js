//OnLoad, damit das Skript erst ausgeführt wird, wenn die Seite komplett geladen wurde
function myOnLoad() {
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
  l.addToLeaderBoard("Max", 50);
  l.addToLeaderBoard("Tim", 100);
  l.addToLeaderBoard("Krissi", 1500);
  //Ende Sprach-Definition
  //----------------------------------------------------------------------------------------------------------------------------------------------------


  $("#LanguageName").html("Name der Sprache: " + l.getName());
  $("#output").html(l.getEventText());
  $("#currentT").html("Derzeitiges Nicht-Terminal: " + l.getCurrentNT());
  $("#path").html(l.getPath());
  $("#points").html("Derzeitige Punkte: " + l.getPoints());

  $("#print").on("click",function() {
    $("#output").html(l.getRulesAsText());
  });

  $("#check").on("click",function() {
    let x = $("#current").val();
    let rules = l.getPossibleRules(x);
    let ret = new Language("", rules);
    $("#output").html(ret.getRulesAsText());
  });

  $("#next").on("click",function() {
	  /*
    let x = l.getCurrentNT();
    let rules = l.getPossibleRules(x);
    let ret = new Language(rules);
    $("#output").html(ret.getRulesAsText());
	*/
	$("#output").html(l.getEventText());
  });

  $("#nextStep").on("click",function() {
    let x = $("#chooseStep").val();
    let chosen = l.chooseRule(x);

    if (chosen) {
      $("#path").html(l.getPath());
      $("#currentT").html("Current non-Terminal: " + l.getCurrentNT());
	  $("#output").html(l.getEventText());
	  $("#points").html("Derzeitige Punkte: " + l.getPoints());
	} else {
	  console.log("Eingabe ist kein mögliches Nicht-Terminal")
	}
  });

  $("#restart").on("click", function() {
    let json = JSON.stringify(l);

    l = Language.parse(json);

    $("#LanguageName").html("Name der Sprache: " + l.getName());
    $("#path").html(l.getPath());
    $("#currentT").html("Current non-Terminal: " + l.getCurrentNT());
    $("#output").html(l.getEventText());
    $("#points").html("Derzeitige Punkte: " + l.getPoints());

    console.log(l.getName());
  });
}






