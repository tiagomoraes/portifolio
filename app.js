let express = require('express');
let secure = require('ssl-express-www');
let app = express();

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log('Listening on port 3000'));

