import { NextFunction, Request, Response } from "express";
import { Org } from "../../types/Org";
import { prisma } from "../..";

export const getCurrentOrgProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const currentOrg = req.user as Org;
		const id = currentOrg.id;
		const org = await prisma.org.findUnique({
			where: { id },
		});
		if (!org) {
			res.status(404);
			next(new Error("org not found"));
		}
		res.status(200).json(org);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
