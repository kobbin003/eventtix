import { NextFunction, Request, Response } from "express";
import { prisma, stripe } from "../..";

export const createConnectedAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, businessName, orgId } = req.body;
		const account = await stripe.accounts.create({
			type: "standard",
			email,

			business_profile: {
				name: businessName,
			},
			settings: { payments: { statement_descriptor: businessName } },
		});
		if (!account) {
			res.status(400);
			next(new Error("Account could not be created"));
		} // chek if the org already has a payment:
		const orgHasPayment = await prisma.payment.findUnique({ where: { orgId } });
		if (orgHasPayment) {
			res.status(200).json(orgHasPayment);
		}
		// create payment with the connected account that we receive
		const payment = await prisma.payment.create({
			data: {
				orgId,
				connectedAccId: account.id,
				// details_submitted
				detailsSubmitted: account.details_submitted,
			},
		});
		if (!payment) {
			res.status(400);
			next(new Error("payment data could not be created"));
		}
		res.status(200).json(payment);
	} catch (error) {
		res.json({ msg: `error: ${error.message}` });
	}
};
