import nodemailer from 'nodemailer';

// Create transport for email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(userEmail, verificationToken) {
  // Use the token passed in instead of generating a new one
  const verificationLink = `${process.env.FRONTEND_URL}/mentoring/verify?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    html: `
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>This link will expire in 24 hours. Thank you!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email.');
  }
}
