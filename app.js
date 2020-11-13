var cfenv = require('cfenv');
var express = require('express');
var cors = require('cors');
var routes = require('./routes');
var api = require('./api');
var path = require('path');

// 새로운 express 서버 생성
var app = express();
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var bodyParser = require('body-parser');
app.use (bodyParser.urlencoded ({limit : '50mb', extended : true}));
app.use (bodyParser.json ({limit : '50mb', extended : true}));
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// CORS 설정
app.use(cors());

//router setting
routes.route(app, api);

var http = require('http').Server(app);
// start the server
http.listen(appEnv.port, function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
