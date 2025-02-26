import createToken  from '../../utils/jwtUtils.js';
import AuthHandler from '../../handlers/authHandler.js'

class AuthenticationManager {
  static async login(credentials) {
    try {
      const { email, password } = credentials;

      const user = await AuthHandler.checkLogin(email, password);

      const token = createToken(user._id, user.email);

      const sanitizedUser = {
        _id : user._id,
        firstName : user.firstName,
        lastName : user.lastName,
        company : user.company,
        experience : user.experience,
        role : user.role
      }

      return { token , user : sanitizedUser };
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  }
  static async userLogin(credentials) {
    try {
      const { email, password } = credentials;

      const user = await AuthHandler.checkUserLogin(email, password);

      const token = createToken(user._id, user.email);

      const sanitizedUser = {
        _id : user._id,
        firstName : user.firstName,
        lastName : user.lastName,
        role : user.role
      }

      return { token , user : sanitizedUser };
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  }
}


export default AuthenticationManager;
