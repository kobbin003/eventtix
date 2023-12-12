import express from "express";
import { PrismaClient } from "@prisma/client";
import { authRouter } from "./routes/authRouter.js";
import { notFound } from "./utils/notFound.js";
import { errorHandler } from "./utils/errorHandler.js";
import passport from "passport";
import { initializePassportWithJwtStrategy } from "./passport/jwtstrategy.js";
import { profileRouter } from "./routes/profileRouter.js";
const app = express();

let PORT = process.env.PORT || 3000;

initializePassportWithJwtStrategy();

export const prisma = new PrismaClient();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ msg: "HOME" });
});

app.get("/hello", (req, res) => {
	res.json({ msg: "Hello World!!!" });
});

app.get("/check", async (req, res) => {
	try {
		const example = await prisma.example.create({
			data: { name: "kobin", age: 31 },
		});
		res.json(example);
	} catch (error) {
		res.status(400).send("Error");
	}
});

app.use("/auth", authRouter);
app.use("profile", profileRouter);

/** 404 route handling middleware */
app.use((req, res, next) => {
	notFound(req, res, next);
});

/** error handler */
app.use(errorHandler);

app.listen(PORT, () => console.log(`app is running in port: ${PORT}`));
