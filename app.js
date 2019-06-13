// ==================== EXTERNAL IMPORTS ==================== //

const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sslRedirect = require('heroku-ssl-redirect');
const nodemailer = require('nodemailer');
const firebase = require('firebase')
require('dotenv').config();

// ==================== INTERNAL IMPORTS ==================== //

// ==================== GLOBAL VARIABLES ==================== //

const port = process.env.PORT || 3000;
const app = express();

// ==================== FIREBASE ==================== //

firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "portifolio-tiagomoraes.firebaseapp.com",
  databaseURL: "https://portifolio-tiagomoraes.firebaseio.com",
  projectId: "portifolio-tiagomoraes",
  storageBucket: "portifolio-tiagomoraes.appspot.com",
  messagingSenderId: "914374598997",
  appId: "1:914374598997:web:ef8670019ffd9cff"
});

const db = firebase.database();

// ==================== MIDDLEWARE ==================== //

app.use(compression()); // used for speed

app.use(sslRedirect()); // ensures we are on https on 'production' (default)

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public'))); // serves stati files under public

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ==================== ROUTES ==================== //

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/portifolio', (req,res) => {
    res.render('modal-portifolio');
});

app.get('/integrar', (req,res) => {
    res.render('modal-integrar');
});

app.get('/symvoulos', (req,res) => {
  res.render('modal-symvoulos');
});

app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>How find me: ${req.body.how_select}</li>
        <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
    `;

    // async..await is not allowed in global scope, must use a wrapper
    async function main(){

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Tiago" <contact.tiagomoraes@gmail.com>', // sender address
            to: "tiago3902@gmail.com", // list of receivers
            subject: `[SITE-CONTACT] ${req.body.subject}`, // Subject line
            html: output // html body
        };
    
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions, (error, info) => {
            res.render('index', {status:'Massage sent!'});
        });
    
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    }
    
    main().catch(console.error);
});

// ==================== FUNCTIONS ==================== //

// ==================== START APP ==================== //

app.listen(port, () => {
    console.log('Listening on port ' + port);
});