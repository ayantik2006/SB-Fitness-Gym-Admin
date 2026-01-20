import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendForgotPasswordEmail from "../utils/sendForgotPasswordEmail.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;

  const userData = await User.findOne({ email: email });
  if (!userData) {
    return res.status(404).json({ message: "User does not exist!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password!" });
  }

  const jwtToken = jwt.sign({ user: email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("user", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });

  return res.status(200).json({ message: "Login successful" });
}

export async function register(req, res) {
  const { email, password } = req.body;

  const userData = await User.findOne({ email: email });
  if (userData) {
    return res.status(409).json({ message: "User already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email: email, password: hashedPassword });
  return res.status(200).json({ message: "User account created" });
}

export async function forgotPasswordEmail(req, res) {
  const { email } = req.body;
  const userData = await User.findOne({ email: email });
  if (!userData) {
    return res.status(404).json({ message: "User does not exist!" });
  }

  let recentForgotPasswordEmailTime = userData.recentForgotPasswordEmailTime;
  const now = Math.floor(new Date().getTime() / 1000);
  if (
    recentForgotPasswordEmailTime !== 0 &&
    now - recentForgotPasswordEmailTime <= 600
  ) {
    return res.status(200).json({ message: "Please try after some time!" });
  }

  sendForgotPasswordEmail(email,userData._id);

  recentForgotPasswordEmailTime = Math.floor(new Date().getTime() / 1000);
  await User.updateOne(
    { email: email },
    { recentForgotPasswordEmailTime: recentForgotPasswordEmailTime },
  );
  await User.updateOne({ email: email }, { isForgotPasswordDone: false });

  return res.status(200).json({ message: "Please check your inbox!" });
}

export async function forgotPasswordReset(req, res) {
  const id = req.params.id;
  const userData = await User.findOne({ _id: id });

  const recentForgotPasswordEmailTime = userData.recentForgotPasswordEmailTime;
  const now = Math.floor(new Date().getTime() / 1000);

  if (now - recentForgotPasswordEmailTime > 600) {
    return res.render("../views/forgotPasswordLinkExpired.ejs");
  }

  if (userData.isForgotPasswordDone) {
    return res.render("../views/forgotPasswordResetDone.ejs");
  }

  return res.render("../views/forgotPasswordReset.ejs",{id:id, backendURL:process.env.BACKEND_URL});
}

export async function handleForgotPasswordDone(req,res){
  const {password,id}=req.body;
  const hashedPassword=await bcrypt.hash(password,10);
  await User.updateOne({_id:id},{password:hashedPassword});
  await User.updateOne({_id:id},{isForgotPasswordDone:true});
  return res.status(200).json({message:"Password reset successful!"});
}