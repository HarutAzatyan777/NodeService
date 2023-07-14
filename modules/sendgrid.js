const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//
// const sendEmail = (to, subject, html) => {
//   const msg = {
//     to,
//     from: process.env.SENDGRID_FROM_MAIL,
//     subject,
//     html
//   };
//
//   console.log('msg<<<<', msg)
//
//   return sgMail.send(msg);
// };


const transportConfig = nodemailerSendgrid({
  apiKey: process.env.SENDGRID_API_KEY
});

let transporter = nodemailer.createTransport(transportConfig);

const sendEmail = (to, subject, html) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_MAIL,
    subject,
    html
  };

  return transporter.sendMail(msg);

};

module.exports = { sendEmail };
