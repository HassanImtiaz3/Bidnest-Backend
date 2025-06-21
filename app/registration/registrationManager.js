import createToken from "../../utils/jwtUtils.js";
import RegisterHandler from "../../handlers/registerHandler.js";

class RegistrationManager {
  static async vendorData(vendorData) {
    try {
      const saveVendor = await RegisterHandler.storeUser(vendorData);
      const token = createToken(saveVendor._id, saveVendor.email);
      console.log("[INFO] Vendor data successfully saved to the database.");
      console.log("[DEBUG] Saved Vendor Record:", saveVendor);
      const sanitizedUser = {
        _id: saveVendor._id,
        firstName: saveVendor.firstName,
        lastName: saveVendor.lastName,
        company: saveVendor.company,
        experience: saveVendor.experience,
        role: saveVendor.role,
        uuid: saveVendor.uuid,
        phoneNumber: saveVendor.phoneNumber,
        email: saveVendor.email,
        address: saveVendor.address,
        description: saveVendor.description,
        ntnNumber: saveVendor.ntnNumber,
      };
      return { token, saveVendor: sanitizedUser };
    } catch (error) {
      console.error("[ERROR] Error while saving vendor data:", error.message);
      throw error;
    }
  }
}

export default RegistrationManager;
