import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '0'),
    secure: false, // true for port 465, false for port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

export const sendEmail = async (to: string, subject: string, text: string) => {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
};
