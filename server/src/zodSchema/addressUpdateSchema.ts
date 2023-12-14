import z from "zod";

export const AddressUpdateSchema = z
	.object({
		field: z.enum(["addressLine1", "addressLine12", "state", "pin"]),
		value: z.union([z.string().min(1), z.number().min(1)]),
	})
	.refine(
		(data) => {
			if (data.field == "pin") {
				return typeof data.value == "number";
			} else {
				return typeof data.value == "string";
			}
		},
		{
			message:
				"Value must be a string if field is a string, and a number otherwise",
			path: ["value"],
		}
	);
