import { NextFunction, Request, Response } from "express";
import { prisma, stripe } from "../..";
import { createPurchase } from "../../service/purchase/createPurchase";
import "dotenv/config";
export const stripeWebhookController = (req: Request, res: Response) => {
	const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
	// const endpointSecret =
	// 	"whsec_7b244ff558e4f85f64bf55b40ffe1af29a9be12c015cc04742154a80e635f49f";

	const sig = req.headers["stripe-signature"];

	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
		console.log("webhook verified");
	} catch (error) {
		console.log(`webhook error: ${error.message}`);
		res.status(400).send(`Webhook Error: ${error.message}`);
		return;
	}

	// handle event:

	// account
	if (event.type == "account.updated") {
		const account = event.data.object;
		console.log(`account update: ${account.id}`);
		console.log("updated account detail", account);
		if (account.details_submitted) {
			console.log("on boarding success");
			// update the payment record's detailssubmitted to true
			prisma.payment
				.update({
					where: { orgId: account.metadata.orgId },
					data: { detailsSubmitted: true },
				})
				.then((payment) => console.log("details_submitted updated!", payment));
		}
	} else if (event.type == "product.created") {
		const product = event.data.object;
		console.log(`product create with id: ${product.id}`);
		// update event with productId
		if (product.id) {
			prisma.event
				.update({
					where: { id: product.metadata.eventId },
					data: {
						productId: product.id,
					},
				})
				.then(() =>
					console.log(
						`event with id ${product.metadata.eventId} got priceId(${product.id}) updated`
					)
				);
		}
	} else if (event.type == "price.created") {
		const price = event.data.object;
		console.log(`price create with id: ${price.id}`);
		// update event with priceId
		if (price.id) {
			prisma.event
				.update({
					where: { id: price.metadata.eventId },
					data: {
						priceId: price.id,
					},
				})
				.then(() =>
					console.log(
						`event with id ${price.metadata.eventId} got priceId(${price.id}) updated`
					)
				);
		}
	}
	// payment success
	else if (event.type == "payment_intent.succeeded") {
		const paymentIntentSucceeded = event.data.object;
		console.log(
			`payment intent succeeded: ${paymentIntentSucceeded.amount_received}`
		);
	}
	// payment failure
	else if (event.type == "payment_intent.payment_failed") {
		const paymentIntent = event.data.object;
		const error = paymentIntent.last_payment_error;
		console.log(`payment intent failed message: ${error.message}`);
		console.log(
			`PaymentIntent ${paymentIntent.id} experienced a ${error.type} error.`
		);
		console.log(`error object: ${JSON.stringify(error)}`);
		switch (error.type) {
			case "StripeCardError":
				console.log(`payment error: ${error.message}`);
				if (error.payment_intent.charges.data[0].outcome.type === "blocked") {
					console.log("payment blocked for suspected fraud");
				} else if (error.code == "card_declined") {
					console.log("payment declined by the issuer");
				} else if (error.code == "expired_card") {
					console.log("expired card");
				} else {
					console.log("other card error");
				}
				break;
			case "StripeInvalidRequestError":
				console.log("An invalid request occurred.");
				if (error.param) {
					console.log(`The parameter ${error.param} is invalid or missing.`);
				}
				break;
			default:
				console.log(
					`Another problem occurred of type: ${error.type} & code: ${error.code}`
				);
				break;
		}
	} else if (event.type === "setup_intent.succeeded") {
		console.log("setup created");
	} else if (event.type === "checkout.session.completed") {
		const checkoutSession = event.data.object;
		// res.status(200).json(checkout);
		console.log(checkoutSession);
		console.log(`checkout completed: ${checkoutSession.id}`);
		// create purchase record

		try {
			createPurchase(
				checkoutSession.metadata.eventId,
				checkoutSession.id,
				checkoutSession.amount_total / 100
			).then((purchase) =>
				console.log(`purchase record created. purchaseId: ${purchase.id}`)
			);
		} catch (error) {
			// next(error.message);
			console.log(error.message);
		}
	}

	console.log(
		`Unhandled event type ${event.type}; message:${event.data.object.error.message}`
	);

	// Return a 200 response to acknowledge receipt of the event
	// res.send().end();
};

// async function createPurchase(){
// 	await prisma.purchase.create({data:{
// 		checkoutSessionId:
// 	}})
// }
