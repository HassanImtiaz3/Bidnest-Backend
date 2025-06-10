import Admin from "../../model/admin.js"; // adjust path as needed
import createToken from "../../utils/jwtUtils.js";
import bcrypt from "bcrypt";

class AdminController {
  static async createAdmin(req, res) {
    try {
      const { email, password } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();

      // Generate JWT token
      const adminToken = createToken(newAdmin._id);

      res.status(201).json({
        message: "Admin created successfully",
        adminToken,
      });
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async validateAdmin(req, res) {
    try {
      const { email, password } = req.body;

      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token
      const adminToken = createToken(admin._id);

      res.status(200).json({
        message: "Login successful",
        adminToken,
      });
    } catch (error) {
      console.error("Error validating admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AdminController;
