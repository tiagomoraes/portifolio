let express = require('express');
let app = express();

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log('Listening on port 3000'));

let https_redirect = function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
};

app.use(https_redirect);