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
			where: {
				location: { contains: location },
			},
		});
		if (events.length == 0) {
			return [];
		}
		return events;
	} catch (error) {
		throw new Error(error);
	}
};
