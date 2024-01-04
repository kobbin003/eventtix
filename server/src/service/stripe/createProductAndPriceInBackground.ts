import { stripe } from "../..";

export const createProductAndPriceInBackground = async (
	eventId: string,
	connectedAccId: string,
	title: string,
	ticketPrice: number
) => {
	const product = await stripe.products.create(
		{
			name: title,
			metadata: {
				eventId,
			},
		},
		{ stripeAccount: connectedAccId }
	);
	const productId = product.id;
	if (!productId) {
		throw new Error("product could not be made");
	}
	stripe.prices.create(
		{
			currency: "inr",
			unit_amount: Number(ticketPrice) * 100,
			product: productId,
			metadata: {
				eventId,
			},
		},
		{ stripeAccount: connectedAccId }
	);
};
