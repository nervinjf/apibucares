const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "condominioparquebucare1@gmail.com",
        pass: process.env.G_PASSWORD,
    },
    // tls:{
    //     rejectUnauthorized: 0,
    // },
});

module.exports = transporter;