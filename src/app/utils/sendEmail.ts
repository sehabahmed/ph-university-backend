import nodemailer from 'nodemailer';
import logger from './logger';

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: 'sehabahmed50100@gmail.com',
          pass: 'jktk qfnn jtld quyz',
        },
      });
    
      await transporter.sendMail({
        from: 'sehabahmed50100@gmail.com',
        to,
        subject: 'Change your password!',
        text: 'Reset your password within 10 minutes.',
        html, 
      });

      
  } catch (err){
    logger.error("Error Sending Email",  err)
  }
};
