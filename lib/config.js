require('dotenv').config({ path: './.env' });

// const SENDMAIL_TRANSPORT = {
//   // This transport uses the local sendmail installation.
//   sendmail: true,
//   newline: 'unix',
//   path: '/usr/sbin/sendmail',
// };

const SMTP_TRANSPORT = {
  // This is a Nodemailer transport. It can either be an SMTP server or a
  // well-known service such as Sengrid, Mailgun, Gmail, etc.
  // See https://nodemailer.com/transports/ and https://nodemailer.com/smtp/well-known/
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secureConnection: 'true',
  tls: {
    //
  },
};

module.exports = {
  transport: SMTP_TRANSPORT,
  mailOptions: {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
  },
  debugEnabled: false,
};
