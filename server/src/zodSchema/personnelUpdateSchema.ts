import z from "zod";

export const personnelUpdateSchema = z
	.object({
		field: z.enum(["principal", "vicePrincipal", "staffs"]),
		value: z.union([z.string(), z.string().array()]),
	})
	.refine(
		(data) => {
			if (data.field === "staffs") {
				return Array.isArray(data.value);
			} else {
				return typeof data.field == "string";
			}
		},
		{
			message:
				"value should be an array of string when field is staffs or string otherwise",
			path: ["value"],
		}
	);
