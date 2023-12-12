import { z } from "zod";

export const PersonnelSchema = z.object({
	principal: z.string().min(1),
	vicePrincipal: z.string().min(1),
	staffs: z.string().array().min(1).max(5),
});
