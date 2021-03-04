let express = require("express");
let app = express();
let path = require("path");


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/SpielGUI.html'));
});

app.get('/', function(req, res) {
    // ToDo Auslesen des Textes aus languages.txt
    res.send();
});

