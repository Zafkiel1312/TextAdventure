class Language {
  constructor(rules, eventText, leaderBoard) {
    if (eventText == undefined) {
  		this.eventText = "";
  	} else {
  		this.eventText = eventText;
  	}

    if (rules == undefined || rules == []) {
      this.rules = [];
      this.currentNT = "";
    } else {
      this.rules = rules;
      this.currentNT = this.rules[0].getFrom();
    }

    this.path = [this.currentNT];

	this.points = 0;

	if (leaderBoard == undefined) {
	  this.leaderBoard = [];
	} else {
	  this.leaderBoard = leaderBoard;
	}
  }


  getRules() {
    return this.rules;
  }

  addRule(rule) {
    this.rules.push(rule);
    if (this.currentNT == "") {
      this.currentNT = rule.getFrom();
      this.path = [this.currentNT];
    }
  }

  getCurrentNT() {
    return this.currentNT;
  }

  getEventText() {
	  return this.eventText;
  }

  getPath() {
    return this.path;
  }

  getPoints() {
    return this.points;
  }

  getLeaderBoard() {
    return this.leaderBoard;
  }

  isFinished() {
    return this.currentNT === undefined;
  }

  addToLeaderBoard(name, points) {
    let temp = {
      "name": name,
      "points": points
    }
    this.leaderBoard.push(temp);
  }


  getPossibleRules(nonTerminal) {
    let arr = [];
    let nt = nonTerminal;
    let that = this;
    this.rules.forEach(function(item) {
      if (nt == undefined) {
        if (item.getFrom() == that.currentNT) {
          arr.push(item);
        }
      } else {
        if (item.getFrom() == nt) {
          arr.push(item);
        }
      }
    });
    return arr;
  }

  getRulesAsText() {
    let ret = "";
    this.rules.forEach(function(item) {
      ret = ret.concat(item.getFrom() + " --> " + item.getTo() + "<br>");
      ret = ret.replace(",", "");
    });
    return ret;
  }

  //extra option zum auswählen der Regel einfügen (index) --> Nicht unbedingt nötig
  //wirft noch viele exceptions, muss behoben werden (wenn arr nach der Schleife leer ist)
  //wenn sprache terminiert steht in #currentT undefined, nicht schön
  chooseRule(Terminal) {
    let arr = [];
    this.getPossibleRules().forEach(function(item) {
      if (Terminal == item.getTo()[0]) {
        arr.push(item);
      }
    });

    if (arr.length == 0) {
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

    return new Language(temp, l["eventText"], l["leaderBoard"]);
  }
}