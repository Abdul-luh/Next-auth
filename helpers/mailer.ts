import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userid }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userid.tostring(), 10);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userid, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userid, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}

		var transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "3427758e235166",
				pass: "e415ae8669d18c",
			},
			//todo add these credentials to .env file
		});

		const mailOptions = {
			from: "",
			to: email,
			subject:
				emailType == "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p>Click <a href="${
				process.env.domain
			}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY" ? "Verify your email" : "reset your password"
			}</p>`,
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		console.log(error);
		return error.message;
	}
};
