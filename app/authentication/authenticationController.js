import authenticationManager from "./authenticationManager.js";

class AuthenticationController {
  static async login(req, res) {
    try {
      const credentials = req.body;
      const result = await authenticationManager.login(credentials);

      res.status(200).json({
        message: "[INFO] Credentials Verified Successfully",
        token: result.token, 
        user: result.user,   
      });
    } catch (error) {
      console.error("[ERROR] Failed to match credentials:", error.message);
      res.status(500).json({
        error: "[ERROR] Internal Server Error while login",
        details: error.message, 
      });
    }
  }
  static async userLogin(req, res) {
    try {
      const credentials = req.body;
      const result = await authenticationManager.userLogin(credentials);

      res.status(200).json({
        message: "[INFO] Credentials Verified Successfully",
        token: result.token, 
        user: result.user,   
      });
    } catch (error) {
      console.error("[ERROR] Failed to match credentials:", error.message);
      res.status(500).json({
        error: "[ERROR] Internal Server Error while login",
        details: error.message, 
      });
    }
  }
}

export default AuthenticationController;
