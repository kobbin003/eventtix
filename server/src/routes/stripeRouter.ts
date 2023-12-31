import express from "express";
const router = express.Router();
import "dotenv/config";
import { stripe } from "..";
import { createConnectedAccount } from "../controller/stripe/createConnectedAccount";
import { createAccountLink } from "../controller/stripe/createAccountLink";
import { createProduct } from "../controller/stripe/createProduct";
import { createPrice } from "../controller/stripe/createPrice";
import { createCheckoutSession } from "../controller/stripe/createCheckoutSession";
import { getConnectedAccount } from "../controller/stripe/getConnectedAccount";
import { agreement } from "../controller/stripe/agreement";
import { getPaymentDetails } from "../controller/stripe/getPaymentDetails";
import passport from "passport";
// import { redirectAccountLink } from "../controller/stripe/redirectAccountLink";

// create connected account
router.post("/account/create", createConnectedAccount);

// get connected account
router.get("/account", getConnectedAccount);

// update stripe connected account agrement.
// https://stripe.com/in/legal/connect-account
router.put("/account/agreement", agreement);

// qwertymilkpop123@
// create account link
// it returns a url where the user can onboard to stripe
/**
 * after onboarding on stripe:
 * the "details_submitted filed of the connected account will be true"
 */
router.post(
	"/account/link",
	passport.authenticate("jwt", { session: false }),
	createAccountLink
);
// router.get(
// 	"/account/link/redirect",
// 	passport.authenticate("jwt", { session: false }),
// 	redirectAccountLink
// );

// create product
router.post("/product", createProduct);

// create price (required before checkout)
router.get("/price", createPrice);

//create checkout session
router.post("/checkout", createCheckoutSession);

// retrieve a session(checkout)
router.get("/session/retrieve", async (req, res) => {
	const sessionId = req.query.sessionId as string;
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		res.status(200).json(session);
	} catch (error) {
		res.status(400).json({ msg: `error: ${error.message}` });
	}
});
// This is your Stripe CLI webhook secret for testing your endpoint locally.

/* ------------------------ payment model ------------------------ */

// get current user's payment model data
router.get(
	"/payment",
	passport.authenticate("jwt", { session: false }),
	getPaymentDetails
);

export { router as stripeRouter };
