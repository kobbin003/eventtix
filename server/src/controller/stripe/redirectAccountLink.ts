import { NextFunction, Request, Response } from "express";

export const redirectAccountLink = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const url = req.query.url as string;
	if (url) {
		res.redirect(url);
	} else {
		res.status(400);
		next(new Error("invalid Url"));
	}
};
