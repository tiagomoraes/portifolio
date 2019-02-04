let express = require('express');
let http = require('http');
let enforce = require('express-sslify');

let port = process.env.PORT || 3000;
let app = express();

app.use(express.static(__dirname + '/public'));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});