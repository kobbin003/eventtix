import { prisma } from "../..";

export const createPurchase = async (
	eventId: string,
	checkoutSessionId: string,
	amount: number
) => {
	const purchase = await prisma.purchase.create({
		data: {
			eventId,
			checkoutSessionId,
			amount,
		},
	});
	if (!purchase) {
		throw new Error("purchase record could not be created");
	}
	return purchase;
};
