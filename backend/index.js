const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

require('dotenv').config();

const app = express();
const port = 3149;

const cors = (req, res, next) => {
    const whitelist = [
      'http://localhost:8000',
      'https://blacklyexactly.netlify.com',
      'https://black-dev.netlify.com',
      'https://black-dev.pl'
    ];
    const origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  }  

app.use(bodyParser.json());
app.use(basicAuth({
    users: { mail: process.env.AUTH_PASSWORD },
    challenge: true
}))
app.use(cors);

app.get('/sendMail', ( req, res ) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    const { email, message } = req.query;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'onecer.dont.reply@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const options = {
        from: 'onecer.dont.reply@gmail.com',
        to: 'supreme24d@gmail.com',
        subject: `Wiadomość od ${email}`,
        text: `
            Email: ${email}
            Wiadomość: ${message}
        `
    };

    transporter.sendMail(options, ( error, info ) => {
        if(error){
            res.end(`fail: ${email}`);
            throw error;
        }
        else res.end(`success: ${email}`);
    })
})

app.listen(port, ()=> console.log(`Listening on port: ${port}`));