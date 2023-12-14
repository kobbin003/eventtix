import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { personnelUpdateSchema } from "../../zodSchema/personnelUpdateSchema";

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
					zodErrorMessages,
				},
			});
		} else {
			const personnelId = req.params.personnelId;

			const { field, value } = result.data;

			//* update the address:
			const updatedPersonnel = await prisma.personnels.update({
				where: { id: personnelId },
				data: { [field]: value },
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
