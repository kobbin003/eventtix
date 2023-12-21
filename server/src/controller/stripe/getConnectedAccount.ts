import { Request, Response } from "express";
import { stripe } from "../..";

export const getConnectedAccount = async (req: Request, res: Response) => {
	try {
		const accId = req.query.accId as string;
		const account = await stripe.accounts.retrieve(accId);

		res.status(200).json(account);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
