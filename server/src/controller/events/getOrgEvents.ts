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
			orderBy: {
				time: "desc",
			},
			/** cannot use id and name at the same time */
			include: {
				org: {
					// select: { id: true, name: true },
					include: {
						payment: {
							select: { connectedAccId: true, detailsSubmitted: true },
						},
					},
				},
			},
		});

		res.status(200).json(events);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
