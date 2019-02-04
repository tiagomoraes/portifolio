var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var enforce = require('express-sslify');

var port = process.env.PORT || 3000;
var app = express();

app.use(serveStatic('public', {'index': 'index.html'}));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});