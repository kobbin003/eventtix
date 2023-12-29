import { Request, Response } from "express";
import { stripe } from "../..";

export const getConnectedAccount = async (req: Request, res: Response) => {
	try {
		const connectedAccId = req.query.connectedAccId as string;
		const account = await stripe.accounts.retrieve(connectedAccId);

		res.status(200).json(account);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
