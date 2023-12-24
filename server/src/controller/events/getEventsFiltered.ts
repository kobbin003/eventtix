import { NextFunction, Request, Response } from "express";
import { getEventsByLocation } from "../../service/event/getEventsByLocation";
import { getEventsByOrgName } from "../../service/event/getEventsByOrgName";
import { EventFilterQueriesSchema } from "../../zodSchema/EventFilterSchema";
import { getEventsByDate } from "../../service/event/getEventsByDate";

export const getEventsFiltered = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// query key-value validation
		const validatedResult = EventFilterQueriesSchema.safeParse(req.query);
		if (validatedResult.success !== true) {
			const issues = validatedResult.error.issues;
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
			const queries = validatedResult.data;

			const location = queries.location;
			const day = queries.day;
			const orgName = queries.orgName;

			const skip = queries.offset;
			const take = queries.limit;

			let events: any[] = [];
			if (location) {
				events = await getEventsByLocation(
					location,
					Number(skip),
					Number(take)
				);
			} else if (orgName) {
				events = await getEventsByOrgName(orgName, Number(skip), Number(take));
			} else if (day) {
				events = await getEventsByDate(day, Number(skip), Number(take));
			} else {
				res.status(400);
				next(new Error("Bad request"));
			}

			res.status(200).json(events);
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
