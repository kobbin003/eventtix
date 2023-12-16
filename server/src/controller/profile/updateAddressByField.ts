import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { AddressUpdateSchema } from "../../zodSchema/addressUpdateSchema";
import { Org } from "../../types/Org";
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
			const currentOrg = req.user as Org;
			const orgId = currentOrg.id;

			const { field, value } = result.data;
			/** 👆 not required since update will throw 'RecordNotFound' exception if record is not found */

			//* update the address:
			const updatedAddressOrg = await prisma.org.update({
				where: { id: orgId },
				data: {
					address: {
						update: { [field]: value },
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
