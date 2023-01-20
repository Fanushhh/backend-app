const nodemailer = require("nodemailer");

const sendEmail = async (listTo, subject, text, html = "") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `${process.env.MAIL_APP} <${process.env.MAIL_USERNAME}>`,
    to: listTo.join(", "),
    subject: subject,
    text: text,
    html: html,
  });
};

module.exports = { sendEmail };
