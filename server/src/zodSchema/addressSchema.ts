import { z } from "zod";

export const AddressSchema = z.object({
	addressLine1: z.string().min(1),
	addressLine2: z.string().optional(),
	state: z.string().min(6),
	pin: z.number().min(1),
});
