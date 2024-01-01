import { NextFunction, Request, Response } from "express";
import { prisma, stripe } from "../..";
import "dotenv/config";
import { Org } from "../../types/Org";
export const createAccountLink = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const currentOrg = req.user as Org;
	const connectedAccId = req.query.connectedAccId as string;
	const clientUrl = process.env.CLIENT_URL;
	if (connectedAccId) {
		try {
			// check if the currentOrg has the connectedId linked
			const payment = await prisma.payment.findUnique({
				where: { connectedAccId },
			});
			if (!payment) {
				res.status(404);
				next(new Error("payment account not found"));
			}
			if (payment.orgId !== currentOrg.id) {
				res.status(401);
				next(new Error("Unauthorized"));
			}
			const acccountLink = await stripe.accountLinks.create({
				account: connectedAccId,
				// tryagain
				refresh_url: `${clientUrl}/user/profile/payment`,
				return_url: `${clientUrl}/user/profile/payment`,
				type: "account_onboarding",
			});
			if (acccountLink) {
				res.status(200).json(acccountLink);
			} else {
				res.status(400);
				next(new Error("could not create account link"));
			}
		} catch (error) {
			res.json({ msg: `error: ${error.message}` });
		}
	}
};
