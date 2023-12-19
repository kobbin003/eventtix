import express from "express";
import passport from "passport";
import { login } from "../controller/auth/login";
import { register } from "../controller/auth/register";
import { refreshToken } from "../controller/auth/refreshToken";

const router = express.Router();

// PUBLIC
// register
router.post("/register", register);

// PRIVATE
// login
router.post("/login", login);

//PRIVATE
// refresh-token
router.get(
	"/refreshToken",
	// passport.authenticate("jwt", { session: false }),
	refreshToken
);

export { router as authRouter };
