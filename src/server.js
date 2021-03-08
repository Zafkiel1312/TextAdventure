let express = require("express");
let path = require("path");

let app = express();


app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'SpielGUI.html'));
});

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

app.listen(3000); // NodeJS-WebServer lauscht an Port 3000
console.log("Running at port 3000");
