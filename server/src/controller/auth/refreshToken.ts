import { NextFunction, Request, Response } from "express";
import "dotenv/config";

import jwt from "jsonwebtoken";
import generateJwtToken from "../../utils/generateJwtToken";
import { JwtPayload } from "../../types/JwtPayload";
export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const refreshToken = req.cookies.refreshToken;
	// const refreshToken = req.body.refreshToken;
	console.log("refreshToken", refreshToken);
	if (!refreshToken) {
		return res.status(401).json({ message: "Refresh token not found" });
	}
	const privateKey = process.env.JWT_PRIVATE_KEY;
	try {
		const decoded = jwt.verify(refreshToken, privateKey) as JwtPayload;
		console.log("decoded", decoded);
		if (decoded) {
			const freshAccessToken = await generateJwtToken("access", decoded);
			console.log("freshAccessToken", freshAccessToken);
			res.status(200).json({ accessToken: freshAccessToken });
		}
	} catch (error) {
		res.status(401);
		next(new Error(""));
		//something random
	}
};
