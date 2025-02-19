import EmailService from "../../mailer/mail.js";

class ContactManager {
  static async sendEmail(name, email, phone, message) {
    try {
      const result = await EmailService.sendEmail(name, email, phone, message);
      return result;
    } catch (error) {
      console.error("Error in ContactManager.sendEmail:", error);
      return { success: false, message: "Error sending email." };
    }
  }
}

export default ContactManager;
