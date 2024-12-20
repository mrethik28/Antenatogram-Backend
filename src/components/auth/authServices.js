import { AuthenticationError } from "../../utils/Errors.js";
import { userExists } from "../../../database/services/userExists.js";
import { addUser } from "../../../database/services/addUser.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../utils/jwtUtils.js";
import {
  addNewRefreshToken,
  findAndDelete,
  getNewRefreshToken,
} from "../../../database/refreshtoken/refreshTokenMethods.js";
import { getCurrentPregnancy } from "../../../database/pregnancy/pregnancyMethods.js";

async function signup(req, res, next) {
  const role = req.body.auth.role;
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

  let msg = {};

  if (compare) {
    const id = `${role}_id`;
    const accesstoken = await generateAccessToken(role, userexists[id]);
    const refreshtoken = await generateRefreshToken(role, userexists[id]);
    if (accesstoken instanceof Error) return next(accesstoken);
    if (refreshtoken instanceof Error) return next(refreshtoken);
    const addingtoken = await addNewRefreshToken(
      refreshtoken,
      role,
      userexists[id]
    );
    const pregnancy_id = await getCurrentPregnancy(userexists.patient_id);
    if(pregnancy_id) msg = {...msg, pregnancy_id};
    if (addingtoken instanceof Error) return next(addingtoken);
    if (addingtoken == true) {
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        // secure: true,
        sameSite: "Strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
      msg = {...msg,
        message: "succesfully logged in",
        accesstoken,
        refreshtoken
      }
      return res.send(msg);
    }
  }
  return next(new AuthenticationError("invalid password"));
}

async function logout(req, res, next) {
  const refreshtoken = req.cookies.refreshtoken;
  if (!refreshtoken)
    return next(new AuthenticationError("No refreshtoken found"));
  const verify = await verifyToken(refreshtoken);
  if (verify instanceof Error) return next(verify);
  const role = verify.role;
  const id = verify.sub;
  const deleting = await findAndDelete(role, refreshtoken, id, 1);
  if (deleting instanceof Error) return next(deleting);
  if (deleting) {
    res.clearCookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      // secure: true,
      sameSite: "Strict",
    });
    return res.send({ message: "succesfully logged out" });
  }
  return res.status(500).send({ message: "could not logout" });
}

async function refresh(req, res, next) {
  let msg = {};
  const refreshtoken = req.cookies.refreshtoken;
  if (!refreshtoken)
    return next(new AuthenticationError("No refreshtoken found"));
  const verify = await verifyToken(refreshtoken);
  if (verify instanceof Error) return next(verify);
  const role = verify.role;
  const id = verify.sub;

  const find = await findAndDelete(role, refreshtoken, id, 0);
  if (find instanceof Error) return next(find);
  if (find == "expired") {
    const newToken = await getNewRefreshToken(role, refreshtoken, id);
    // msg = {...msg, "refreshtoken": newToken};
    const pregnancy_id = await getCurrentPregnancy(id) || "jello";
    if(pregnancy_id) msg = {...msg, "pregnancyid": pregnancy_id};
    res.cookie("refreshtoken", newToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "Strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
  }
  const accesstoken = await generateAccessToken(role, id);
  if (accesstoken instanceof Error) return next(accesstoken);
  msg = {...msg, accesstoken, "message":"success"};
  return res.send(msg);
}

export const AuthServices = { signup, signin, logout, refresh };
