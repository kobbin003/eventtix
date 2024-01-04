import { endOfDay, parse } from "date-fns";
import { prisma } from "../..";

export const getEventsByDate = async (
	day: string, //date format(string) -> 2023-12-07
	offset: number,
	limit: number
) => {
	try {
		const dateUTC = new Date(day);
		const endOfDateUTC = endOfDay(dateUTC);
		const events = await prisma.event.findMany({
			skip: offset,
			take: limit,
			where: {
				AND: [
					{
						time: {
							gte: dateUTC,
						},
					},
					{
						time: {
							lte: endOfDateUTC,
						},
					},
				],
			},
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

		// if (events.length == 0) {
		// 	return [];
		// }

		return events;
	} catch (error) {
		throw new Error(error);
	}
};
