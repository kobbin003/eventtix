import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { Org } from "../../types/Org";

export const getOrgEvents = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const currentOrg = req.user as Org;
	const orgId = currentOrg.id;
	try {
		const events = await prisma.event.findMany({
			where: {
				orgId,
			},
		});

		if (events.length == 0) {
			res.status(404);
			throw new Error("events not found");
		}

		res.status(200).json(events);
	} catch (error) {
		res.status(500);
		next(error);
	}
};