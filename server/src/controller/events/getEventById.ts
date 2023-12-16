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
	} catch (error) {
		res.status(500);
		next(error);
	}
};
