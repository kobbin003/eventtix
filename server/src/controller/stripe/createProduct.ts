import { Request, Response } from "express";
import { stripe } from "../..";

export const createProduct = async (req: Request, res: Response) => {
	const productName = req.query.productName as string;
	const connectedAccId = req.query.connectedAccId as string;
	try {
		const product = await stripe.products.create(
			{
				name: productName,
			},
			{ stripeAccount: connectedAccId }
		);

		res.status(200).json(product);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
