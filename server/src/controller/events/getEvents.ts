import { prisma } from "../..";

export const getEvents = async (offset: number, limit: number) => {
	try {
		const events = await prisma.event.findMany({
			skip: offset,
			take: limit,
			orderBy: { time: "desc" },
			/** cannot use id and name at the same time */
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

		return events;
	} catch (error) {
		throw new Error(error);
	}
};
