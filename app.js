let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    let newURL;
  
    // If not on HTTPS, or not on the main domain, redirect
    if (req.headers['x-forwarded-proto'] !== 'https' || req.headers.host !== 'tiagomoraes.me') {
  
      newURL = ['https://tiagomoraes.me', req.url].join('');
      return res.redirect(newURL);
    }
  
    return next();
});

app.listen(port, () => console.log('Listening on port 3000'));