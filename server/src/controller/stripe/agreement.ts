import { Request, Response } from "express";
import { stripe } from "../..";

export const agreement = async (req: Request, res: Response) => {
	try {
		const accId = req.query.accId as string;
		const ip = req.ip;
		const user_agent = req.headers["user-agent"];
		const date = new Date();
		const account = await stripe.accounts.update(accId, {
			tos_acceptance: {
				date: date.getTime(),
				ip,
				user_agent,
			},
		});

		res.status(200).json(account);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
