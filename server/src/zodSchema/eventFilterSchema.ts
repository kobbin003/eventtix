import z from "zod";

export const eventFilterSchema = z.object({
	queryKey: z.enum(["location", "time"]),
});
