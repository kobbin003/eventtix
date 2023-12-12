import express from "express";
import passport from "passport";
import { login } from "../controller/auth/login";
import { register } from "../controller/auth/register";

const router = express.Router();

router.post("/register", register);

// login
router.post("/login", login);

export { router as authRouter };
