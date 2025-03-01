import nodemailer from 'nodemailer';

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
    
      const info = await transporter.sendMail({
        from: 'sehabahmed50100@gmail.com', // sender address
        to, // list of receivers
        subject: 'Change your password!', // Subject line
        text: 'Reset your password within 10 minutes.', // plain text body
        html, // html body
      });

      console.log('Message Sent: %s', info.messageId);
  } catch (err){
    console.log("Error Sending Email",  err)
  }
};
