import z from "zod";

export const EventSchema = z
	.object({
		title: z.string().min(1),
		imageUrl: z.string().optional(),
		desc: z.string().min(1),
		location: z.string().min(1),
		time: z.date(),
		ticketType: z.enum(["paid", "free"]),
		ticketPrice: z.number().optional(),
		priceId: z.string().optional(),
		productId: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.ticketType === "paid") {
				return data.ticketPrice !== undefined;
			} else return true;
		},
		{
			message: "Ticket price is required for paid events",
			path: ["ticketPrice"], // Field to validate conditionally
		}
	);
