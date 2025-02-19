import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); 

class EmailService {
  static async sendEmail(name, email, phone, message) {
    try {
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f03da1ac9d4220",
          pass: "25d672e4e14631"
        }
      });

      const mailOptions = {
        from: `"BidNest Support" <support@bidnest.com>`,
        to: "hassan.imtiaz@visnext.net",
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
      return { success: true, message: "Email sent successfully!", data: emailResult };
    } catch (error) {
      console.error("Email sending error:", error);
      return { success: false, message: "Failed to send email." };
    }
  }
}

export default EmailService;
