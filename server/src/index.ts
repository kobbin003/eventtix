import express from "express";
import { PrismaClient } from "@prisma/client";
import { initializePassportWithJwtStrategy } from "./passport/jwtstrategy.js";
import { errorHandler } from "./utils/errorHandler";
// import { profileRouter } from "./routes/profileRouter";
import { notFound } from "./utils/notFound";
import { authRouter } from "./routes/authRouter";
import { profileRouter } from "./routes/profileRouter";
import { eventRouter } from "./routes/eventRouter.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { stripeRouter } from "./routes/stripeRouter.js";
import { stripeWebhookController } from "./controller/stripe/stripeWebhookController.js";
import cors from "cors";
import Stripe from "stripe";
import { cloudinaryRouter } from "./routes/cloudinaryRouter.js";

const app = express();

let PORT = process.env.PORT || 3000;

initializePassportWithJwtStrategy();

export const prisma = new PrismaClient();

app.use(
	helmet({
		strictTransportSecurity: { maxAge: 31536000, includeSubDomains: true },
	})
);
app.use(cookieParser());
app.use(cors());

const stripeSecret = process.env.STRIPE_SECRET_KEY;
export const stripe = new Stripe(stripeSecret);

// progrmatically add webhook endpoints listener
// async function stripeEndpoint() {
// 	await stripe.webhookEndpoints.create({
// 		url: "https://eventtixapi.onrender.com/stripe/webhook",
// 		enabled_events: [
// 			"account.updated",
// 			"product.created",
// 			"price.created",
// 			"payment_intent.succeeded",
// 			"payment_intent.payment_failed",
// 			"setup_intent.succeeded",
// 			"checkout.session.completed",
// 		],
// 		connect: true,

// 	});
// }
// stripeEndpoint().then(() => console.log("stripe webhook listening"));
/** place this before express.json() */
app.post(
	"/stripe/webhook",
	express.raw({ type: "application/json" }),
	stripeWebhookController
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// timeAndDate();

app.get("/", (req, res) => {
	console.log("log testing - HOME");
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
// console.log(new Date());
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/event", eventRouter);

app.use("/stripe", stripeRouter);

app.use("/cloudinary", cloudinaryRouter);

/** 404 route handling middleware */
app.use((req, res, next) => {
	notFound(req, res, next);
});

/** error handler */
app.use(errorHandler);

app.listen(PORT, () => console.log(`app is running in port: ${PORT}`));
