import jwt from "jsonwebtoken";
import "dotenv/config";
import { JwtPayload } from "../types/JwtPayload.js";

const generateJwtToken = async (payload: JwtPayload) => {
	const privateKey = process.env.JWT_PRIVATE_KEY;
	const jswToken = jwt.sign(payload, privateKey);
	return jswToken;
};

export default generateJwtToken;
