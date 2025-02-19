import ContactManager from "./contactUsManager.js";

class contactController {
  static async sendEmail(req, res) {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const response = await ContactManager.sendEmail(name, email, phone, message);

      if (response.success) {
        return res.status(200).json({ success: true, message: "Email sent successfully!" });
      } else {
        return res.status(500).json({ success: false, message: "Failed to send email." });
      }
      
    } catch (error) {
      console.error("Error in sendEmail:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error." });
    }
  }
}

export default contactController;
