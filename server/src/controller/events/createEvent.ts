import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../../zodSchema/eventschema";
import { prisma, stripe } from "../..";
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
			let productId;
			let priceId;
			//* get current org's connectedAccId
			const currentOrgPayment = await prisma.payment.findUnique({
				where: {
					orgId,
				},
			});
			if (!currentOrgPayment) {
				res.status(400);
				next(new Error("Could not create Event!"));
			}
			if (ticketType == "paid") {
				//* create a product(requires connectedAccId and productName)
				// keep productName as the event title
				const product = await stripe.products.create(
					{
						name: title,
					},
					{ stripeAccount: currentOrgPayment.connectedAccId }
				);
				productId = product.id;
				if (!productId) {
					res.status(400);
					next(new Error("Could not create Event!"));
				}
				// * create a price(requires connectedAccId, ticketPrice and connectedAccId)
				// only if ticketType is "paid"
				const price = await stripe.prices.create(
					{
						currency: "inr",
						unit_amount: Number(ticketPrice) * 100,
						product: productId,
					},
					{ stripeAccount: currentOrgPayment.connectedAccId }
				);
				priceId = price.id;
				if (!priceId) {
					res.status(400);
					next(new Error("Could not create Event!"));
				}
			}

			//* create event at last
			const event = await prisma.event.create({
				data: {
					title,
					desc,
					imageUrl,
					location,
					time,
					ticketPrice: ticketPrice || 0,
					ticketType,
					orgId,
					priceId: priceId ?? null,
					productId: productId ?? null,
				},
				// include: {
				// 	Org: {
				// 		include: {
				// 			payment: {
				// 				select: { connectedAccId: true, detailsSubmitted: true },
				// 			},
				// 		},
				// 	},
				// },
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
