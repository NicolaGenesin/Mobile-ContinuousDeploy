// Appetize Configuration
var pathToArtifact = '/Users/nicola/Git/Dunno-Proximity/app/build/outputs/apk/app-debug.apk';
var urlLocation = 'https://storage.evozi.com/apk/dl/15/05/09/com.blacklight.klondike.patience.solitaire.apk?h=EQHgB4jN6eAUi62jJqVDHQ&t=1439094992';
var token = 'tok_hdzewnreerpguzpyeccu4c4cvr';
var publicKey = '';
var privateKey = '';
var platform = 'android';

var express = require('express');
var chokidar = require('chokidar');
var request = require('request');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();

var log = console.log.bind(console);

app.get('/', function(req, res, next) {
    res.render('index', { url: getIframeUrl() });
});

app.listen(3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//watcher
chokidar.watch('.', {ignored: /[\/\\]\./}).on('all', function (event, path) {
    console.log(event, path);
});

var watcher = chokidar.watch('file, dir, or glob', {
    ignored: /[\/\\]\./,
    persistent: true
});

watcher
    .on('add', function (path) {
        log('File', path, 'has been added');
        var options = {
            uri: 'https://api.appetize.io/v1/app/update',
            method: 'POST',
            json: {
                "token": token,
                "url": urlLocation,
                "platform" : platform
            }
        };
        callAppetize(options);
    })
    .on('change', function (path) {
        log('File', path, 'has been changed');
        var options = {
            uri: 'https://api.appetize.io/v1/app/update',
            method: 'POST',
            json: {
                "token": token,
                "url": urlLocation,
                "platform" : platform,
                "privateKey": privateKey
            }
        };
        callAppetize(options);
    })

watcher.on('change', function (path, stats) {
    if (stats) console.log('File', path, 'changed size to', stats.size);
});

watcher.add(pathToArtifact);

// post request to Appetize.io
function callAppetize(options){
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.id)
            privateKey = body['privateKey'];
            publicKey = body['publicKey'];
        }
    });
}

// iframe source
function getIframeUrl(){
    return 'https://appetize.io/embed/'+publicKey+'?device=iphone5s&orientation=portrait&scale=75&xdocMsg=true&deviceColor=black&debug=true&screenOnly=false';
}

module.exports = app;
