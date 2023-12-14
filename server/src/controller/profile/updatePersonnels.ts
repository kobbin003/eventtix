import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { PersonnelSchema } from "../../zodSchema/personnelSchema";
export const updatePersonnels = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = PersonnelSchema.safeParse(req.body);
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
			const personnelId = req.params.personnelId;
			const { principal, vicePrincipal, staffs } = result.data;

			//* update the address:
			const updatedPersonnelOrg = await prisma.personnels.update({
				where: { id: personnelId },
				data: { principal, vicePrincipal, staffs },
			});

			if (updatedPersonnelOrg) {
				res.status(200).json(updatedPersonnelOrg);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
