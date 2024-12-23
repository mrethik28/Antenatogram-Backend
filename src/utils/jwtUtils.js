import jsonwebtoken from "jsonwebtoken";
import { AuthenticationError, DBError } from "./Errors.js";
import { pool } from "../../database/db.js";

export async function generateAccessToken(role, id) {
  const secret = process.env.JWT_SECRET;
  const payload = {
    sub: id,
    role: role,
    exp: Math.floor(Date.now() / 1000) + 5, //5 seconds
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

export async function verifyToken(token){
  const secret = process.env.JWT_SECRET;
  try{
  const decoded = await jsonwebtoken.verify(token,secret);
  return decoded;
  }
  catch(error){
    if(error instanceof jsonwebtoken.TokenExpiredError) return "expired";
    return new AuthenticationError("Could not verify token");
  }



}