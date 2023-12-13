import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";

export const getOrgProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orgId = req.params.orgId;

		const org = await prisma.org.findUnique({
			where: { id: orgId },
			select: {
				id: true,
				name: true,
				email: true,
				address: true,
				personnels: true,
				events: true,
				createdAt: true,
				updatedAt: true,
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
