import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma } from "../..";

export const getEventById = async (
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
			const event = await prisma.event.findUnique({
				where: {
					id: eventId,
				},
			});

			if (!event) {
				res.status(404);
				throw new Error("event not found");
			}

			res.status(200).json(event);
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
