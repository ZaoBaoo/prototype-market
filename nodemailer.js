require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) { return console.log(err) }
        console.log('Email sent: ', info);
    });
}

module.exports = mailer;