import nodemailer from "nodemailer";

export async function sendWebinarConfirmation({
  email,
  firstName,
  calendarLinks,
}: {
  email: string;
  firstName: string;
  calendarLinks: { google: string; outlook: string };
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || "no-reply@entrehub.org",
    to: email,
    subject: "Registration Confirmed: Upcoming Webinar",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2>Hi ${firstName},</h2>
        <p>Thank you for registering for our upcoming webinar! We are excited to have you join us.</p>
        <p>Below are the details for your calendar:</p>
        <div style="margin: 20px 0;">
          <a href="${calendarLinks.google}" style="background: #4285F4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">Add to Google Calendar</a>
          <a href="${calendarLinks.outlook}" style="background: #0078D4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Add to Outlook</a>
        </div>
        <p>We'll send you a reminder shortly before we start.</p>
        <p>Best regards,<br>The Entrehub Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // In production, you might want to retry or log this to an external service
  }
}
