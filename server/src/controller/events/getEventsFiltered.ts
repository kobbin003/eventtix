import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";

export const getEventsFiltered = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const queryKey = "location" || "time";
	const queryValue = req.query.queryKey;

	// validate query key value pair
	const skip = req.query.offset as string;
	const take = req.query.limit as string;
	try {
		const events = await prisma.event.findMany({
			skip: Number(skip),
			take: Number(take),
			where: {
				[queryKey]: queryValue,
			},
		});

		if (events.length == 0) {
			res.status(404);
			throw new Error("Events not found");
		}

		res.status(200).json(events);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
