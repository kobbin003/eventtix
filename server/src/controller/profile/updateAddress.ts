import { NextFunction, Request, Response } from "express";
import { AddressSchema } from "../../zodSchema/addressSchema";
import { prisma } from "../..";
export const updateAddress = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = AddressSchema.safeParse(req.body);
		/** if validation not success, send zod-error messages */
		if (result.success !== true) {
			const issues = result.error.issues;
			const zodErrorMessages = issues.map(
				(issue) => `${issue.path[0]}: ${issue.message}`
			);
			res.status(400).json({
				error: {
					statusCode: "400",
					zodErrorMessages,
				},
			});
		} else {
			const orgId = req.query.orgId as string;
			const { addressLine1, addressLine2, pin, state } = result.data;

			//* find address with the addressId
			// const orgFound = await prisma.org.findUnique({
			// 	where: { id: orgId },
			// });
			// if (!orgFound) {
			// 	res.status(404);
			// 	next(new Error("User not Found"));
			// }

			/** 👆 not required since update will throw 'RecordNotFound' exception if record is not found */
			//* update the address:
			const updatedAddressOrg = await prisma.org.update({
				where: { id: orgId },
				data: {
					address: {
						update: { addressLine1, addressLine2, pin, state },
					},
				},
			});

			if (updatedAddressOrg) {
				res.status(200).json(updatedAddressOrg);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
