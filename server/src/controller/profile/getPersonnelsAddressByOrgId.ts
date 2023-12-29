import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";

export const getPersonnelsAddressByOrgId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orgId = req.params.orgId;

		const org = await prisma.org.findUnique({
			where: { id: orgId },
			select: {
				name: true,
				email: true,
				address: true,
				personnels: true,
			},
		});

		if (!org) {
			res.status(404);
			throw new Error("Not found!");
		}
		res.status(200).json(org);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
