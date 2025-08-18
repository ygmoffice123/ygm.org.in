import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
  }

  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15h" } // or "1h" depending on your use case
  );

  return accessToken;
};
