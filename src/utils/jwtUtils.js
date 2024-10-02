import jsonwebtoken from "jsonwebtoken";
import { AuthenticationError } from "./backendError.js";

export async function generateAccessToken(role, id) {
  const secret = process.env.JWT_SECRET;
  const payload = {
    sub: id,
    role: role,
    exp: Math.floor(Date.now() / 1000) + 30 * 60, //30mins
  };
  try {
    const token = await jsonwebtoken.sign(payload, secret);
    return token;
  } catch (error) {
    return new AuthenticationError("could not create access token", error);
  }
}

export async function generateRefreshToken(role, id) {
  const secret = process.env.JWT_SECRET;
  const payload = {
    sub: id,
    role: role,
    exp: Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60, // 10 days
  };
  try {
    const token = await jsonwebtoken.sign(payload, secret);
    return token;
  } catch (error) {
    return new AuthenticationError("Could not create refresh token", error);
  }
}
