import express from "express";
import { login, register, forgotPasswordEmail, forgotPasswordReset, handleForgotPasswordDone } from "../controllers/authControllers.js";

const router=express.Router();

router.post("/login",login);
router.post("/register",register);
router.post("/forgot-password-email",forgotPasswordEmail);
router.get("/forgot-password-reset/:id",forgotPasswordReset);
router.post("/forgot-password-done",handleForgotPasswordDone);

export default router;