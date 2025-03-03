import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
  static async sendEmail(name, email, phone, message) {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "bbidnest2@gmail.com",
          pass: "Riphah@0306",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: email,
        to: "hassanimtiazip@gmail.com",
        subject: "New Contact Form Submission",
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };

      const emailResult = await transporter.sendMail(mailOptions);
      return {
        success: true,
        message: "Email sent successfully!",
        data: emailResult,
      };
    } catch (error) {
      console.error("Email sending error:", error);
      return { success: false, message: "Failed to send email." };
    }
  }
}

export default EmailService;
