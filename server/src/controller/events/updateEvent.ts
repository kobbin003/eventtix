import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma, stripe } from "../..";

export const updateEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const eventId = req.params.eventId;

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
			const updatedData = result.data;
			const event = await prisma.event.findUnique({
				where: { id: eventId },
				include: { org: { select: { payment: true } } },
			});
			const prevTicketPrice = event.ticketPrice;

			// check if there is change in ticket price.
			const ticketPriceUpdateRequested =
				prevTicketPrice !== updatedData.ticketPrice;
			if (ticketPriceUpdateRequested) {
				const priceId = updatedData.priceId;
				// create a new priceId and update the event with it
				const price = await stripe.prices.create(
					{
						currency: "inr",
						unit_amount: Number(updatedData.ticketPrice) * 100,
						product: updatedData.productId,
					},
					{ stripeAccount: event.org.payment.connectedAccId }
				);
				if (!price.id) {
					res.status(400);
					next(new Error("could not update the event"));
				}
				// make the old priceId inactive
				await stripe.prices.update(priceId, {
					active: false,
				});
				// update the updatedData with the new priceId
				updatedData.priceId = price.id;
			}
			// update the event
			const updatedEvent = await prisma.event.update({
				where: { id: eventId },
				data: { ...updatedData },
			});
			// event={...updatedData}
			if (updatedEvent) {
				res.status(200).json(updatedEvent);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
