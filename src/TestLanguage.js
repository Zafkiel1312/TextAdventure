//OnLoad, damit das Skript erst ausgeführt wird, wenn die Seite komplett geladen wurde
function myOnLoad() {
  //----------------------------------------------------------------------------------------------------------------------------
  //Definition der Sprache
  let arr = [];

  //Hier steht dann die Sprache

  let l = new Language(arr, "Du bist ein Wanderer auf Reisen und triffst auf eine Weggabelung. Du kannst nach rechts (a) oder nach links (b) gehen. Wofür entscheidest du dich?");

  //Ende Sprach-Definition
  //----------------------------------------------------------------------------------------------------------------------------------------------------


  $("#output").html(l.getEventText());
  $("#currentT").html("Derzeitiges Nicht-Terminal: " + l.getCurrentNT());
  $("#path").html(l.getPath());

  $("#print").click(function() {
    $("#output").html(l.getRulesAsText());
  });

  $("#check").click(function() {
    let x = $("#current").val();
    let rules = l.getPossibleRules(x);
    let ret = new Language(rules);
    $("#output").html(ret.getRulesAsText());
  });

  $("#next").click(function() {
	  /*
    let x = l.getCurrentNT();
    let rules = l.getPossibleRules(x);
    let ret = new Language(rules);
    $("#output").html(ret.getRulesAsText());
	*/
	$("#output").html(l.getEventText());
  });

  $("#nextStep").click(function() {
    let x = $("#chooseStep").val();
    l.chooseRule(x);
    $("#path").html(l.getPath());
    $("#currentT").html("Current non-Terminal: " + l.getCurrentNT());
	$("#output").html(l.getEventText());
  });
}






