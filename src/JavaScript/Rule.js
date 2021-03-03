class Rule {
  /**
    constructor für Regeln der Form "from --> to"
    from enthält ein NT
    to enthält ein Array aus einem T und einem NT (NT kann undefined sein)
    eventText wird angezeigt, wenn die Regel verwendet wird
    points enthält die Menge an Punkten, die der Spieler erhält, wenn die Regel verwendet wird
  */
  constructor(from, to, eventText, points) {
    this.from = from;
    this.to = to;

	if (eventText === undefined) {
	  this.eventText = "";
	} else {
      this.eventText = eventText;
	}

	if (points === undefined) {
	  this.points = 0;
	} else {
	  this.points = points;
	}
  }

  //gibt das from-NT zurück
  getFrom() {
    return this.from;
  }
  //gibt das to-Array zurück
  getTo() {
    return this.to;
  }
  //gibt den eventText der Regel zurück
  getEventText(){
    return this.eventText;
  }
  //gibt die Punkte der Regel zurück
  getPoints() {
    return this.points;
  }
}