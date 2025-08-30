import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (to: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
