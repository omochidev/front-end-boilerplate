var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var port = 7000;

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(port);

console.log('----------------------------------------');
console.log('Serving on http://localhost:' + port);
console.log('----------------------------------------');
