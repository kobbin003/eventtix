import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { AddressUpdateSchema } from "../../zodSchema/addressUpdateSchema";
export const updateAddressByField = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = AddressUpdateSchema.safeParse(req.body);
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
			const addressId = req.params.addressId;
			const { field, value } = result.data;
			/** 👆 not required since update will throw 'RecordNotFound' exception if record is not found */

			//* update the address:
			const updatedAddress = await prisma.address.update({
				where: { id: addressId },
				data: {
					[field]: value,
				},
			});

			if (updatedAddress) {
				res.status(200).json(updatedAddress);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
