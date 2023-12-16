import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma } from "../..";

export const updateEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const eventId = req.params.eventId;

	try {
		const result = EventSchema.safeParse({
			...req.body,
			time: new Date(req.body.time),
		});

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
			const updatedData = result.data;
			const updatedEvent = await prisma.event.update({
				where: { id: eventId },
				data: { ...updatedData },
			});

			if (updatedEvent) {
				res.status(200).json(updatedEvent);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
