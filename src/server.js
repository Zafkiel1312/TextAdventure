let express = require("express");
let app = express();
let server = require('http').createServer(app);
let WebSocket = require('ws');
let path = require("path");

//
let wss = new WebSocket.Server({server});
let sprache;
let name;

//ToDo Werden die WebSockets automatisch geschlossen oder entstehen durch die Funktion immer mehr unnötige Verbindungen?
wss.on('connection', function connection(ws){
    ws.on('message', message=> {
        sprache = JSON.parse(message);
        name = sprache['name'];
        let fs = require("fs");
        fs.writeFile(__dirname + '/data/' + name +'.json', message, function (err) {
            if (err) throw err;
            console.log('Data written to file!');
        })
    })
});

// Erlauben des Zugriffs auf Dateien von einem anderen Port aus
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});


// Anzeigen der SpielGUI beim Aufrufen der URL localhost:3000/
app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'SpielGUI.html'));
});

// Senden des Inhalts der Datei languages.txt als String beim Aufrufen der URL localhost:3000/languages
app.get('/languages', function(req, res) {
    let fs = require("fs");
    fs.readFile(path.join(__dirname,  'data', 'languages.txt'), function (err, data){
        if(err){
            return console.error(err);
        }
        res.send(data.toString());
    })
});

/*app.get('/Testsprache', function(req, res){
    res.sendFile(path.join(__dirname, 'data', 'Testsprache.json'));
});*/

server.listen(3000, () => console.log('Running on port 3000'));
