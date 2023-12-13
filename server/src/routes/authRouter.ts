import express from "express";
import passport from "passport";
import { login } from "../controller/auth/login";
import { register } from "../controller/auth/register";

const router = express.Router();

// PUBLIC
// register
router.post("/register", register);

// PRIVATE
// login
router.post("/login", login);

export { router as authRouter };
