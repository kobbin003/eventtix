import jwt from "jsonwebtoken";
import "dotenv/config";
import { JwtPayload } from "../types/JwtPayload.js";

type TokenType = "refresh" | "access";

const generateJwtToken = async (tokenType: TokenType, payload: JwtPayload) => {
	const privateKey = process.env.JWT_PRIVATE_KEY;
	let token: string;
	/** if tokenType is "access" , jswtoken will be of 1 day expiry date */
	if (tokenType == "access") {
		token = jwt.sign(payload, privateKey, { expiresIn: "1d" });
		/** if tokenType is "refresh" , jswtoken will be of non-expiry */
	} else if (tokenType == "refresh") {
		token = jwt.sign(payload, privateKey);
	}
	return token;
};

export default generateJwtToken;
