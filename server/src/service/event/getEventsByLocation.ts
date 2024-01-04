import { prisma } from "../..";

export const getEventsByLocation = async (
	location: string,
	offset: number,
	limit: number
) => {
	try {
		const events = await prisma.event.findMany({
			skip: offset,
			take: limit,
			orderBy: { time: "desc" },
			where: {
				location: { contains: location },
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
