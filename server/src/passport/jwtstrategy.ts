import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import "dotenv/config";
import { JwtPayload } from "../types/JwtPayload.js";
import { prisma } from "../index.js";
import { Org } from "../types/Org.js";

// import UserModel from "../models/UserModel";
// import { User } from "../types/User";export type Jwtpayload = {
// 	id: string;
// };

export const initializePassportWithJwtStrategy = () => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_PRIVATE_KEY, // Replace with your actual secret key
	};
	// opts.secretOrKey = 'secret';
	// opts.issuer = 'accounts.examplesoft.com';
	// opts.audience = 'yoursite.net';

	const authenticate = async (jwt_payload: JwtPayload, done) => {
		// console.log("jwt_payload", jwt_payload);
		try {
			const foundOrg = await prisma.org.findUnique({
				where: { id: jwt_payload.id },
			});

			if (!foundOrg) {
				return done(null, false, { message: "user not authorised" });
			}

			const { id, name, email, createdAt, updatedAt } = foundOrg;

			const org: Org = { id, name, email, createdAt, updatedAt };

			return done(null, org);
		} catch (error) {
			return done(error, false);
		}
	};

	passport.use(new Strategy(options, authenticate));
};
