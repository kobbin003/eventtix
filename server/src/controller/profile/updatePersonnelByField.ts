import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { personnelUpdateSchema } from "../../zodSchema/personnelUpdateSchema";
import { Org } from "../../types/Org";

export const updatePersonnelsByField = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = personnelUpdateSchema.safeParse(req.body);
		/** if validation not success, send zod-error messages */
		if (result.success !== true) {
			const issues = result.error.issues;
			const zodErrorMessages = issues.map(
				(issue) => `${issue.path[0]}: ${issue.message}`
			);
			res.status(400).json({
				error: {
					statusCode: "400",
					msg: zodErrorMessages,
				},
			});
		} else {
			const currentOrg = req.user as Org;
			const orgId = currentOrg.id;

			const { field, value } = result.data;

			//* update the address:
			const updatedPersonnel = await prisma.org.update({
				where: { id: orgId },
				data: { personnels: { update: { [field]: value } } },
			});

			if (updatedPersonnel) {
				res.status(200).json(updatedPersonnel);
			}
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
