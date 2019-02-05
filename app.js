let express = require('express');
let serveStatic = require('serve-static');

let port = process.env.PORT || 3000;
let app = express();

app.use(secure);

app.use(serveStatic('public', {'index': 'index.html'}));

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

// Functions
let secure = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers.host === 'tiagomoraes.herokuapp.com') {
            return res.redirect(301, 'https://www.tiagomoraes.me');
        } else if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
}