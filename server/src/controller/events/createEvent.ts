import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma } from "../..";
import { Org } from "../../types/Org";

export const createEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const currentOrg = req.user as Org;
	const orgId = currentOrg.id;
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
					msg: zodErrorMessages,
				},
			});
		} else {
			const { title, desc, imageUrl, location, time, ticketPrice, ticketType } =
				result.data;

			const event = await prisma.event.create({
				data: {
					title,
					desc,
					imageUrl,
					location,
					time,
					ticketPrice,
					ticketType,
					orgId,
				},
				include: { Org: true },
			});

			if (!event) {
				res.status(400);
				throw new Error("event could not be created!");
			}

			res.status(200).json(event);
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
