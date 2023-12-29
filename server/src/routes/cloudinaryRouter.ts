import express, { Request, Response } from "express";
import { readFile } from "fs";
import util from "util";
import fs from "fs";
const router = express.Router();
const cloudinary = require("cloudinary").v2;
import multer from "multer";
import { Readable } from "stream";

cloudinary.config({
	secure: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
// Log the configuration
// console.log("cloudinary-config", cloudinary.config());
// PUBLIC
// register
// const readFile = util.promisify(fs.readFile);
router.post(
	"/upload",
	upload.single("file"),
	async (req: Request, res: Response) => {
		const file = req.file;

		// create a readable file stream from the file buffer
		const fileStream = Readable.from(file.buffer);

		/** readable_stream.pipe(writeablestream) */

		try {
			const uploadedResult = await new Promise((resolve, reject) => {
				fileStream.pipe(
					cloudinary.uploader.upload_stream(
						{
							folder: "eventtix",
							use_filename: true,
							overwrite: true,
							use_filename_as_display_name: true,
							//* eager is used for image transformation( that is how we get transformation parameters like 'c_auto,h_600,q_auto,w_600')
							eager: [
								{
									width: 600,
									height: 600,
									crop: "auto",
									quality: "auto",
									fetch_format: "auto",
								},
								{
									width: 260,
									height: 200,
									crop: "auto",
									quality: "auto",
									fetch_format: "auto",
								},
							],
						},
						(error: any, uploadResult: any) => {
							if (uploadResult) {
								resolve(uploadResult);
							} else {
								reject(error);
							}
						}
					)
				);
			});
			// console.log(
			// 	`Buffer upload_stream wth promise success - ${uploadedResult}`
			// );
			// const result = await cloudinary.uploader.upload(req.file.buffer);
			// console.log("result", result);
			res.status(200).json(uploadedResult);
		} catch (error) {
			console.log("error", error);
		}
	}
);

export { router as cloudinaryRouter };
