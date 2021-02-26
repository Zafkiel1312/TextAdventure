class Rule {
  constructor(from, to, eventText, points) {
    this.from = from;
    this.to = to;

	if (eventText == undefined) {
	  this.eventText = "";
	} else {
      this.eventText = eventText;
	}

	if (points == undefined) {
	  this.points = 0;
	} else {
	  this.points = points;
	}
  }

  getFrom() {
    return this.from;
  }
  getTo() {
    return this.to;
  }
  getEventText(){
    return this.eventText;
  }
  getPoints() {
    return this.points;
  }
}