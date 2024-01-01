import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma } from "../..";
import { Org } from "../../types/Org";

export const deleteEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const eventId = req.params.eventId;
	const currentOrg = req.user as Org;
	const orgId = currentOrg.id;
	try {
		const deletedEvent = await prisma.event.delete({
			where: {
				id: eventId,
				orgId: orgId,
			},
		});
		/** if not found, 'RecordNotFound' exception is thrown */
		if (deletedEvent) {
			res.status(200).json(deletedEvent);
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
