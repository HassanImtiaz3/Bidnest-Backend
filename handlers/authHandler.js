import { Registration } from "../model/registrations.js";
import { User } from "../model/user.js"

class AuthHandler {
  static async checkLogin(email, password) {
    try {
      const user = await Registration.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.password !== password) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      console.error("[ERROR] Error while Validating Credentials:", error);
      throw error; 
    }
  }

  static async checkUserLogin(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.password !== password) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      console.error("[ERROR] Error while Validating Credentials:", error);
      throw error; 
    }
  }
}

export default AuthHandler;
