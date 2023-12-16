import { NextFunction, Request, Response } from "express";
import { Org } from "../../types/Org";
import { prisma } from "../..";

export const getCurrentOrgAddress = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const currentOrg = req.user as Org;
		const orgId = currentOrg.id;
		const address = await prisma.org.findUnique({
			where: { id: orgId },
			select: { address: true },
		});

		if (!address) {
			res.status(404);
			next(new Error("address not found"));
		}
		res.status(200).json(address);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
