import { Request, Response } from "express";
import { stripe } from "../..";

export const createCheckoutSession = async (req: Request, res: Response) => {
	const priceId = req.query.priceId as string;
	const connectedAccId = req.query.connectedAccId as string;
	try {
		const session = await stripe.checkout.sessions.create(
			{
				mode: "payment",
				line_items: [
					{
						price: priceId,
						quantity: 1,
					},
				],
				billing_address_collection: "required",
				invoice_creation: { enabled: true },
				customer_creation: "if_required",
				success_url: "http://localhost:3000/success",
				cancel_url: "http://localhost:3000/cancel",
			},
			{ stripeAccount: connectedAccId }
		);
		// console.log(session);
		res.status(200).json(session);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
