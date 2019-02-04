let express = require('express');
let enforce = require('express-sslify');

let port = process.env.PORT || 3000;
let app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.use(express.static(__dirname + '/public'));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));