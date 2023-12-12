import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index.js";
import bcrypt from "bcrypt";
import generateJwtToken from "../../utils/generateJwtToken.js";
import { AuthSchema } from "../../zodSchema/AuthSchema.js";
export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = AuthSchema.safeParse(req.body);

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
			const { email, password } = result.data;

			//* find user with the email
			const foundOrg = await prisma.org.findUnique({ where: { email } });
			if (!foundOrg) {
				res.status(404);
				next(new Error("user with this email does not exist"));
			}

			//* check if password matches
			const passwordMatches = await bcrypt.compare(password, foundOrg.password);

			if (!passwordMatches) {
				res.status(400);
				next(new Error("Incorrect password"));
			}

			//* send the found user
			const payload = { id: foundOrg.id };
			const accessToken = await generateJwtToken(payload);

			res.status(200).json({ ...foundOrg, accessToken });
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
