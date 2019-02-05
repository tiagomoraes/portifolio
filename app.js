let express = require('express');
let serveStatic = require('serve-static');
let sslRedirect = require('heroku-ssl-redirect');

let port = process.env.PORT || 3000;
let app = express();

app.use(sslRedirect()); // ensures we are on https on 'production' (default)

app.use(serveStatic('public', {'index': 'index.html'})); // serves stati files under public

app.listen(port, function() {
    console.log('Listening on port ' + port);
});