import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET_KEY

const createToken = (userId, email) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  const token = jwt.sign(
    { userId, email },
    "secret",
    { expiresIn: '1h' }
  );
  return token;
};

export default createToken;
