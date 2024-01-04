import { NextFunction, Request, Response } from "express";
import { Org } from "../../types/Org";
import { prisma } from "../..";

export const getCurrentOrgPayment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const currentOrg = req.user as Org;
		const orgId = currentOrg.id;
		const payment = await prisma.org.findUnique({
			where: { id: orgId },
			select: { payment: true },
		});

		if (!payment) {
			res.status(404);
			next(new Error("payment not found"));
		}
		res.status(200).json(payment);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
