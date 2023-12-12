import express from "express";
import passport from "passport";
import { login } from "../controller/auth/login.js";
import { register } from "../controller/auth/register.js";

const router = express.Router();

router.post("/register", register);

// login
router.post("/login", login);

export { router as authRouter };
