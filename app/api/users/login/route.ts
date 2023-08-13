import { dbConnect } from "@/dbConfig/dbconfilg";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		const { email, password } = reqBody;
		console.log("loginUser", reqBody);

		// CHECK IF USER EXISTS IN THE DB

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return NextResponse.json(
				{ error: "User does not exsist" },
				{ status: 400 }
			);
		}

		// CHECK IF PASSWORD IS CORRECT
		const validatePassword = await bcryptjs.compare(
			password,
			existingUser.password
		);
		if (!validatePassword) {
			return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
		}

		// CREATE TOKEN DATA
		const tokenData = {
			id: existingUser._id,
			username: existingUser.username,
			email: existingUser.email,
		};

		console.log(tokenData);

		// console.log("tokenData", tokenData);
		// CREATE TOKEN
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		// SET RESPONSE
		const response = NextResponse.json({
			message: "Login Successful",
			success: true,
		});

		// INCLUDE COOKIES
		response.cookies.set("token", token, {
			httpOnly: true,
		});

		// console.log(response);
		return response;
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
