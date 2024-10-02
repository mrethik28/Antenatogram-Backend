import { AuthenticationError } from "../../utils/backendError.js";
import { userExists } from "../../../database/services/userExists.js";
import { addUser } from "../../../database/services/addUser.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils.js";
import { addNewRefreshToken } from "../../../database/refreshtoken/refreshTokenServices.js";

async function signup(req, res, next) {
  const role = req.body.auth.role;
  console.log(role);

  const userexists = await userExists(role, req.body.email);
  if (userexists instanceof Error) return next(userexists);
  else if (userexists)
    return next(new AuthenticationError("user already exists"));

  const salt = await bcrypt.genSalt(10);
  const passwordhash = await bcrypt.hash(req.body.password, salt);

  const addingUser = await addUser(role, req.body.email, passwordhash);
  if (addingUser instanceof Error) return next(addingUser);
  return res.send({ message: "user successfully registered" });
}

async function signin(req, res, next) {
  const role = req.body.auth.role;
  console.log(role);

  const userexists = await userExists(role, req.body.email);
  if (userexists instanceof Error) return next(userexists);
  else if (!userexists)
    return next(new AuthenticationError("no such user exists"));

  const password = req.body.password;
  const compare = await bcrypt.compare(password, userexists.passwordhash);

  if (compare){
    const id = `${role}_id`;
    const accesstoken = await generateAccessToken(role, userexists[id])
    const refreshtoken = await generateRefreshToken(role, userexists[id])
    if(accesstoken instanceof Error) return next(accesstoken);
    if(refreshtoken instanceof Error) return next(refreshtoken);
    const addingtoken = await addNewRefreshToken(refreshtoken,role,userexists[id]);
    if(addingtoken instanceof Error) return next(addingtoken);
    if(addingtoken == true) return res.send({ message: "succesfully logged in", "accesstoken": accesstoken, "refreshtoken": refreshtoken });

  } 
  return next(new AuthenticationError("invalid password"));
}

async function logout(req, res, next) {}
async function refresh(req, res, next) {}

export const AuthServices = { signup, signin, logout, refresh };
