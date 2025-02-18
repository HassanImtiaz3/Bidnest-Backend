import UserHandler from "../../handlers/userHandler.js";
import createToken from "../../utils/jwtUtils.js";

class UserManager {
  static async signup(userData) {
    try {
      const saveUser = await UserHandler.storeUser(userData);
      const token = createToken(saveUser._id, saveUser.email);
      console.log("[INFO] User data successfully saved to the database.");
      console.log("[DEBUG] Saved User Record:", saveUser);

      const sanitizedUser = {
        _id : saveUser._id,
        firstName : saveUser.firstName,
        lastName : saveUser.lastName,
        role : saveUser.role
      }

      return { token, saveUser : sanitizedUser };
    } catch (error) {
      console.error("[ERROR] Error while saving user data:", error.message);
      throw error;
    }
  }
}

export default UserManager;
