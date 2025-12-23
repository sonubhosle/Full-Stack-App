
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: { 
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS 
    }
  });

  await transporter.sendMail({ from:`"Shoply" <${process.env.SMTP_USER}>`, to, subject, html });
};
