import jwt from "jsonwebtoken";

export const generateToken = (uid: number): string => {
  const payload = { uid };

  return jwt.sign(payload, process.env.PRIVATE_JWT_KEY || "", {
    expiresIn: "24h",
  });
};
