const nodemailer = require('nodemailer');

const mailSender = async (email, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to: email,
      subject: "AR Assignment Password Reset",
      html: body,
    });
    console.log("Email info: ", info);
    return info;

  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;
