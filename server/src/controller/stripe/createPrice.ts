import { Request, Response } from "express";

import { stripe } from "../..";

export const createPrice = async (req: Request, res: Response) => {
	// const ticketPrice = req.query.ticketPrice as string;
	// const productId = req.query.productId as string;
	const connectedAccId = req.query.connectedAccId as string;
	try {
		const price = await stripe.paymentMethods.list({
			customer: connectedAccId,
			type: "card",
		});
		// const price = await stripe.prices.create(
		// 	{
		// 		currency: "inr",
		// 		unit_amount: Number(ticketPrice),
		// 		product: productId,
		// 	},
		// 	{ stripeAccount: connectedAccId }
		// );

		res.status(200).json(price);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
