class Language {
  /**
    constructor für Language
    rules enthält ein Array an Rule-Objekten, das from-NT der ersten Regel wird zum Start-NT der Sprache
    startText enthält das Ausgangsszenario der Sprache
    leaderBoard enthält ein Array an Objekten mit dem Aufbau:
      {"Name": "*",
      "Points": *}
  */
  constructor(rules, startText, leaderBoard) {
    if (startText === undefined) {
        this.startText = "";
  		this.eventText = "";
  	} else {
        this.startText = startText;
  		this.eventText = startText;
  	}

    if (rules === undefined || rules === []) {
      this.rules = [];
      this.currentNT = "";
    } else {
      this.rules = rules;
      this.currentNT = this.rules[0].getFrom();
    }

    this.path = [this.currentNT];

	this.points = 0;

	if (leaderBoard === undefined) {
	  this.leaderBoard = [];
	} else {
	  this.leaderBoard = leaderBoard;
	}
  }

  //gibt das Array an regeln zurück
  getRules() {
    return this.rules;
  }

  //fügt der Sprache eine neue Regel hinzu
  addRule(rule) {
    this.rules.push(rule);
    if (this.currentNT === "") {
      this.currentNT = rule.getFrom();
      this.path = [this.currentNT];
    }
  }

  //gibt das derzeitige NT der Sprache zurück
  getCurrentNT() {
    return this.currentNT;
  }

  //gibt das derzeitige Szenario der Sprache zurück
  getEventText() {
	  return this.eventText;
  }

  //gibt den bisher verwendeten Pfad zurück
  getPath() {
    return this.path;
  }

  //gibt den aktuellen Punktestand der Sprache zurück
  getPoints() {
    return this.points;
  }

  //gibt ein Array mit allen Leaderboard-Einträgen zurück
  getLeaderBoard() {
    return this.leaderBoard;
  }

  //gibt true zurück, wenn die Sprache terminiert ist
  isFinished() {
    return this.currentNT === undefined;
  }

  //fügt einen neuen Eintrag in das Leaderboard ein
  addToLeaderBoard(name, points) {
    let temp = {
      "name": name,
      "points": points
    }
    this.leaderBoard.push(temp);
  }


  //gibt ein Array zurück, welches alle Regeln enthält, die nonTerminal als from-NT haben
  getPossibleRules(nonTerminal) {
    let arr = [];
    let nt = nonTerminal;
    let that = this;
    this.rules.forEach(function(item) {
      if (nt === undefined) {
        if (item.getFrom() === that.currentNT) {
          arr.push(item);
        }
      } else {
        if (item.getFrom() === nt) {
          arr.push(item);
        }
      }
    });
    return arr;
  }

  //gibt ein String zurück, welcher alle Regeln in HTML darstellt
  getRulesAsText() {
    let ret = "";
    this.rules.forEach(function(item) {
      ret = ret.concat(item.getFrom() + " --> " + item.getTo() + "<br>");
      ret = ret.replace(",", "");
    });
    return ret;
  }

  /**
    Wählt eine Regel, welche zu den aktuellen NT und dem benutzten T passt
    gibt es mehrere mögliche Regeln, wird zufällig eine von diesen ausgewählt
    Path, currentNT, eventText und Points werden entsprechend angepasst
  */
  chooseRule(Terminal) {
    let arr = [];
    this.getPossibleRules().forEach(function(item) {
      if (Terminal === item.getTo()[0]) {
        arr.push(item);
      }
    });

    if (arr.length === 0) {
      return false;
    }

    let rand = Math.floor(Math.random() * arr.length);
    this.path[this.path.length-1] = arr[rand].getTo()[0];
    this.path.push(arr[rand].getTo()[1]);
    this.currentNT = arr[rand].getTo()[1];
	this.eventText = arr[rand].getEventText();
	this.points += arr[rand].getPoints();
	return true;
  }

  //Funktion zum parsen eines JSON-Strings zu einem Language-Objekt
  //JSON.stringify(language) benutzen, um den JSON-String zu erhalten
  static parse(json) {
    let l = JSON.parse(json);

    let arr = l["rules"];
    let temp = [];
    arr.forEach(function(item) {
      let r = new Rule(item["from"], item["to"], item["eventText"], item["points"]);
      temp.push(r);
    });

    return new Language(temp, l["startText"], l["leaderBoard"]);
  }
}