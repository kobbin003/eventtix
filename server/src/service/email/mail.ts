import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		// TODO: replace `user` and `pass` values from <https://forwardemail.net>
		user: "nodeTest@gmail.com",
		pass: "testPassword",
	},
});

const mailOptions = {
	from: "nodeTest@gmail.com",
	to: "kobin369@gmail.com",
	subject: "trying nodemail",
	text: "hey got this?",
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
