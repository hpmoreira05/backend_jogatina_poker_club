require('dotenv/config');
const nodemailer = require('nodemailer');

const sendEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    await transporter.sendMail({
      from: '"The Wall App" <the.wall.app.service@gmail.com>', 
      to: email, 
      subject: 'Account Created Successfully ✔', 
      text: `Hello ${name}! Your account has been created! Welcome, and enjoy ;)`,
    });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { sendEmail };