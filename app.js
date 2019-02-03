let express = require('express');
let app = express();

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log('Listening on port 3000'));

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`);
  else
    next();
});