import registrationManager from "./registrationManager.js";

class RegistrationController {
  static async vendorData(req, res) {
    try {
      const vendorData = req.body;
      console.log("req body", req.body);
      const result = await registrationManager.vendorData(vendorData);
      console.log("[INFO] Vendor data successfully stored in the database.");
      res.status(200).json({
        message: "[INFO] Data stored successfully!",
        token: result.token,
        vendor: result.saveVendor,
      });
    } catch (error) {
      console.error("[ERROR] Failed to store vendor data:", error.message);
      res.status(500).json({ error: "[ERROR] Internal Server Error" });
    }
  }
}

export default RegistrationController;
