import { NextFunction, Request, Response } from "express";
import { stripe } from "../..";

export const createConnectedAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, businessName } = req.body;
		const account = await stripe.accounts.create({
			type: "standard",
			email,

			business_profile: {
				name: businessName,
			},
		});
		if (!account) {
			res.status(400);
			next(new Error("Account could not be created"));
		}
		res.status(200).json(account);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
