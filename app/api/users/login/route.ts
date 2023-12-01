import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbconfilg";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		console.log(reqBody);
		const { email, password }: { email: string; password: string } = reqBody;

		// Check if user exists in the data base
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			console.log({
				error: "This user doesn't exist, please input a valid user",
			});

			return res.json(
				{
					error: "This user doesn't exist, please input a valid user",
				},
				{ status: 403 }
			);
		}
		console.log(existingUser);

		// If user exists continue with the process
		// check if password is Correct by comparing with bcrypt
		const validatePassword = await bcryptjs.compare(
			password,
			existingUser.password
		); // returns true|false

		if (!validatePassword) {
			console.log({
				error: "incorrect password, please input a valid password",
			});
			return res.json(
				{ error: "incorrect password, please input a valid password" },
				{ status: 400 }
			);
		}

		// If password was validated
		// Create a token data that will be sent as cookies using jwt
		const tokenData = {
			id: existingUser._id,
			email: existingUser.email,
			username: existingUser.username,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		return res
			.json({
				message: "Login Successful",
				success: true,
			})
			.cookies.set("token", token, { httpOnly: true });
	} catch (error: any) {
		console.log("An error occured \n", error);
		return res.json({ error: error.message }, { status: 500 });
	}
}

// import { dbConnect } from "@/dbConfig/dbconfilg";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// dbConnect();

// export async function POST(req: NextRequest) {
// 	try {
// 		const reqBody = await req.json();
// 		const { email, password } = reqBody;
// 		console.log("loginUser", reqBody);

// 		// CHECK IF USER EXISTS IN THE DB

// 		const existingUser = await User.findOne({ email });
// 		if (!existingUser) {
// 			return NextResponse.json(
// 				{ error: "User does not exsist" },
// 				{ status: 400 }
// 			);
// 		}

// 		// CHECK IF PASSWORD IS CORRECT
// 		const validatePassword = await bcryptjs.compare(
// 			password,
// 			existingUser.password
// 		);
// 		if (!validatePassword) {
// 			return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
// 		}

// 		// CREATE TOKEN DATA
// 		const tokenData = {
// 			id: existingUser._id,
// 			username: existingUser.username,
// 			email: existingUser.email,
// 		};

// 		console.log(tokenData);

// 		// console.log("tokenData", tokenData);
// 		// CREATE TOKEN
// 		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
// 			expiresIn: "1d",
// 		});

// 		// SET RESPONSE
// 		const response = NextResponse.json({
// 			message: "Login Successful",
// 			success: true,
// 		});

// 		// INCLUDE COOKIES
// 		response.cookies.set("token", token, {
// 			httpOnly: true,
// 		});

// 		// console.log(response);
// 		return response;
// 	} catch (error: any) {
// 		console.log(error);
// 		return NextResponse.json({ error: error.message }, { status: 500 });
// 	}
// }
