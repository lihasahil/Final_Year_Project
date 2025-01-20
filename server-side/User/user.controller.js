import express from "express";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// * register admin
router.post("/user/register", async (req, res) => {
  // extract new admin from req.body
  const newUser = req.body;

  // check if admin with provided email already exists
  const user = await User.findOne({ email: newUser.email });

  // if admin already exists, throw error
  if (user) {
    return res.status(409).send({ message: "Email already exists." });
  }

  // hash password
  const plainPassword = newUser.password;
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  console.log(hashedPassword);

  //replace plain password with hashedpassword
  newUser.password = hashedPassword;
  // insert admin
  await User.create(newUser);

  // send res
  return res.status(201).send({ message: "User is registered successfully." });
});

router.post("/user/login", async (req, res) => {
  // extract login credentials from req.body
  const loginCredentials = req.body;

  // find admin using email from login Credential
  const requiredUser = await User.findOne({ email: loginCredentials.email });

  // if not admin, throw error
  if (!requiredUser) {
    return res.status(404).send({ message: "Invalid credentials." });
  }

  // check for password match

  const plainPassword = loginCredentials.password;
  const hashedPassword = requiredUser.password;

  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  // if not password match,throw error
  if (!isPasswordMatch) {
    return res.status(404).send({ message: "Invalid credentials." });
  }

  // generate token
  const payload = { email: requiredUser.email };
  const secretkey = "foefhuf#$#%4123434";
  const token = jwt.sign(payload, secretkey);

  //   hide password
  requiredUser.password = undefined;

  // send res
  return res.status(200).send({
    message: "success",
    userDetails: requiredUser,
    accessToken: token,
  });
});
export default router;
