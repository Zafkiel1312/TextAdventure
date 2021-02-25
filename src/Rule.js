class Rule {
  constructor(from, to, eventText) {
    this.from = from;
    this.to = to;

	if (eventText == undefined) {
		this.eventText = "";
	} else {
		this.eventText = eventText;
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
}