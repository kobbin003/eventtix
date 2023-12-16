import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { PersonnelSchema } from "../../zodSchema/personnelSchema";
import { Org } from "../../types/Org";
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
			const currentOrg = req.user as Org;
			const orgId = currentOrg.id;

			const { principal, vicePrincipal, staffs } = result.data;

			//* update the address:
			const updatedPersonnelOrg = await prisma.org.update({
				where: { id: orgId },
				data: { personnels: { update: { principal, vicePrincipal, staffs } } },
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
