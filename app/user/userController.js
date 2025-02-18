import UserManager from "./userManager.js";

class UserController {
  static async signup(req, res) {
    try {
      const data = req.body;
      const result = await UserManager.signup(data);
      return res.status(200).json({
        message: "[INFO] Data stored successfully!",
        token : result.token,
        user : result.saveUser,
      });
    } catch (error) {
      console.error("[ERROR] Failed to store User data:", error.message);
      res.status(500).json({ error: "[ERROR] Internal Server Error" });
    }
  }
}

export default UserController;
