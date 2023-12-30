import { Request, Response } from "express";
import { prisma, stripe } from "../..";
import "dotenv/config";
const clientUrl = process.env.CLIENT_URL;
export const createCheckoutSession = async (req: Request, res: Response) => {
	const priceId = req.query.priceId as string;
	const eventId = req.query.eventId as string;
	const quantity = req.query.quantity as string;
	const connectedAccId = req.query.connectedAccId as string;
	console.log("clientUrl", clientUrl);
	try {
		const session = await stripe.checkout.sessions.create(
			{
				mode: "payment",
				line_items: [
					{
						price: priceId,
						quantity: Number(quantity),
					},
				],
				metadata: { eventId },
				billing_address_collection: "required",
				// invoice_creation: { enabled: true },
				customer_creation: "if_required",
				success_url: `${clientUrl}/payment/success`,
				cancel_url: `${clientUrl}/payment/failure/${eventId}`,
				// return_url: `${clientUrl}/event/${eventId}`,
			},
			{ stripeAccount: connectedAccId }
		);
		res.status(200).json(session);

		// // console.log(session);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
