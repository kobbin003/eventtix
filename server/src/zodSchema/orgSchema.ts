import { z } from "zod";

export const OrgSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});
