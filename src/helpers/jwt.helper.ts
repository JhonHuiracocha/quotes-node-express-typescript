import jwt from "jsonwebtoken";

export const generateToken = (uid: number): string => {
  const payload = { uid };

  return jwt.sign(payload, process.env.SECRET_JWT_SEED || "", {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string, secrect: string): any => {
  return jwt.verify(token, secrect);
};
