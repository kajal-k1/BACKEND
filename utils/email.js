
  import dotenv from 'dotenv';
  dotenv.config();

  import nodemailer from 'nodemailer';

  console.log('SMTP CONFIG:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
  });


  const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: parseInt(process.env.EMAIL_PORT, 10),
   secure: process.env.EMAIL_PORT === '465', 
   auth: {
     user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  export const sendVerificationEmail = async (toEmail, token) => {
    const verificationLink = `${process.env.BACKEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
    from: `"Tata CLiQ Luxury" <${process.env.EMAIL_USER}>`,
    to: toEmail,
   subject: 'Verify Your Email - Tata CLiQ Luxury',
    html: `
        <h2>Welcome to Tata CLiQ Luxury</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>This link will expire after use. If you didn’t sign up, please ignore this email.</p>
      `,
    };

    try {
     const info = await transporter.sendMail(mailOptions);
      console.log(' Verification email sent:', info.response);
    } catch (error) {
      console.error(' Error sending verification email:', error);
    }
  };


  export const sendWelcomeEmail = async (toEmail, userName) => {
    const mailOptions = {
      from: `"Tata CLiQ Luxury" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Welcome to Tata CLiQ Luxury!',
      html: `<h1>Hello ${userName},</h1><p>Thank you for registering at Tata CLiQ Luxury.</p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(' Welcome email sent:', info.response);
    } catch (error) {
      console.error(' Error sending welcome email:', error);
    }
  };
