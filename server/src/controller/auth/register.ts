import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import bcrypt from "bcrypt";
import { z } from "zod";
import { OrgSchema } from "../../zodSchema/orgSchema";
import { AddressSchema } from "../../zodSchema/addressSchema";
import { PersonnelSchema } from "../../zodSchema/personnelSchema";
import generateJwtToken from "../../utils/generateJwtToken";

const RegisterSchema = z.object({
	org: OrgSchema,
	address: AddressSchema,
	personnels: PersonnelSchema,
});

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//* zod-validation
		const result = RegisterSchema.safeParse(req.body);

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
			const {
				org: { name, email, password },
				address: { addressLine1, addressLine2, state, pin },
				personnels: { principal, vicePrincipal, staffs },
			} = result.data;

			//* check if a user with email exists
			const emailTaken = await prisma.org.findFirst({ where: { email } });

			if (emailTaken) {
				res.status(400);
				next(new Error("email is already in use!"));
			}

			//* hash password
			const saltRound = 10;

			const hashedPassword = await bcrypt.hash(password, saltRound);

			/** else, create account */
			//* 1. create.org
			const account = await prisma.org.create({
				data: {
					name,
					email,
					password: hashedPassword,
					personnels: null,
					address: null,
				},
			});

			//* 2. create.address && link it to account
			const address = await prisma.address.create({
				data: {
					addressLine1,
					addressLine2,
					state,
					pin,
					Org: { connect: { id: account.id } },
				},
			});

			//*3 creat.personnel && link it to account
			const personnels = await prisma.personnels.create({
				data: {
					principal,
					vicePrincipal,
					staffs,
					Org: { connect: { id: account.id } },
				},
			});

			//* generate token
			const payload = { id: account.id };

			const accessToken = await generateJwtToken(payload);

			res.status(200).json({ account, address, personnels, accessToken });
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
