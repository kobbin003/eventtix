import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma } from "../..";

export const deleteEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const eventId = req.params.eventId;

	try {
		const result = EventSchema.safeParse(req.body);

		if (result.success !== true) {
			const issues = result.error.issues;
			const zodErrorMessages = issues.map(
				(issue) => `${issue.path[0]}: ${issue.message}`
			);
			res.status(400).json({
				error: {
					statusCode: "400",
					zodErrorMessages,
				},
			});
		} else {
			const deletedEvent = await prisma.event.delete({
				where: {
					id: eventId,
				},
			});
			/** if not found, 'RecordNotFound' exception is thrown */
			if (deletedEvent) {
				res.status(200).json(deletedEvent);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
