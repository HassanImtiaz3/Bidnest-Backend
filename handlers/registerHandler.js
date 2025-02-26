import { Registration } from "../model/registrations.js";

class RegisterHandler {
  static async storeUser(vendorData) {
    try {
      const {
        firstName,
        lastName,
        company,
        phoneNumber,
        experience,
        email,
        password,
        role,
        address,
      } = vendorData;

      const { city, zipCode, country, state } = address;

      const newVendorRegister = new Registration({
        firstName,
        lastName,
        company,
        phoneNumber,
        experience,
        email,
        password,
        role,
        address: {
          city,
          zipCode,
          country,
          state,
        },
      });

      const saveVendor = await newVendorRegister.save();
      
      return saveVendor;
    } catch (error) {
      console.error("[ERROR] Error while Register Vendor:", error);
      throw error;
    }
  }
}

export default RegisterHandler;
