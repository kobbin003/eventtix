import { Request, Response } from "express";
import { stripe } from "../..";

export const createAccountLink = async (req: Request, res: Response) => {
	const connectedId = req.query.connectedId as string;
	try {
		const acccountLink = await stripe.accountLinks.create({
			account: connectedId,
			refresh_url: "http://localhost:3000/refresh",
			return_url: "http://localhost:3000/return",
			type: "account_onboarding",
		});
		res.status(200).json(acccountLink);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
