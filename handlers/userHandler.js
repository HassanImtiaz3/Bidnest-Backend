import { User } from "../model/user.js";

class UserHandler {
  static async storeUser(userData) {
    try {
      const { firstName, lastName, phoneNumber, email, password, role, uuid } =
        userData;

      const newUserData = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        role,
        uuid,
      });

      const saveUserData = await newUserData.save();
      return saveUserData;
    } catch (error) {
      console.error("[ERROR] Error while Storing User:", error);
      throw error;
    }
  }
}

export default UserHandler