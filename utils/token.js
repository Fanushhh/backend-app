import jwt from "jsonwebtoken";

const generateActivateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_ACTIVATE_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_AUTH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export { generateActivateToken, generateAuthToken };
