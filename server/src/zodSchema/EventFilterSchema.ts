import z from "zod";

export const EventFilterQueriesSchema = z.object({
	location: z.string().optional(),
	orgName: z.string().optional(),
	day: z.string().optional(),
	offset: z.string(),
	limit: z.string(),
});
