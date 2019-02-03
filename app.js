let express = require('express');
var sslRedirect = require('heroku-ssl-redirect');
let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(sslRedirect());
app.listen(port, () => console.log('Listening on port 3000'));