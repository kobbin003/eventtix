import { prisma } from "../..";

export const getEventsByOrgName = async (
	orgName: string,
	offset: number,
	limit: number
) => {
	try {
		const orgs = await prisma.org.findMany({
			where: { name: { contains: orgName } },
			select: { id: true },
		});
		const orgIds = orgs.map((org) => org.id);

		const events = await prisma.event.findMany({
			skip: offset,
			take: limit,
			where: { orgId: { in: orgIds } },
		});

		if (events.length == 0) {
			return [];
		}

		return events;
	} catch (error) {
		throw new Error(error);
	}
};
