import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbconfilg";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

type ReqBody = { username: string; email: string; password: string };

dbConnect();

const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		const { username, email, password }: ReqBody = reqBody;

		// check if inputs are not empy
		if (
			(!username || username === "") &&
			(!email || email === "") &&
			(!password || password === "")
		) {
			console.log({ error: "please input username, email and password!" });

			return res.json(
				{
					error: "please input username, email and password!",
				},
				{ status: 500 }
			);
		}

		// Check if user exists
		const user = await User.findOne({ email });

		if (user) {
			console.log({ error: "user already exists" });
			return res.json({ error: "user already exists" });
		}

		// if user doesn't exist continue with the registration
		// Hashe the password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();

		console.log(savedUser);

		return res.json({
			message: "User Created Successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}

// import { dbConnect } from "@/dbConfig/dbconfilg";
// import User from "@/models/userModel";
// import bcryptjs from "bcryptjs";
// // import { Yatra_One } from "next/font/google";
// import { NextRequest, NextResponse } from "next/server";

// dbConnect();

// export async function POST(req: NextRequest) {
// 	try {
// 		const reqBody = await req.json();
// 		const { username, email, password } = reqBody;

// 		console.log(reqBody);

// 		// check if inputs are not empy
// 		if (
// 			(!username || username === "") &&
// 			(!email || email === "") &&
// 			(!password || password === "")
// 		) return;

// 		// check if users alreeady exists
// 		const user = await User.findOne({ email });

// 		if (user) {
// 			console.log({ error: "User already exists" });
// 			return NextResponse.json({ error: "User already exists" });
// 		}

// 		// hash password
// 		const salt = await bcryptjs.genSalt(10);
// 		const hashedPassword = await bcryptjs.hash(password, salt);

// 		const newUser = new User({
// 			username,
// 			email,
// 			password: hashedPassword,
// 		});
// 		const savedUser = await newUser.save();
// 		console.log(savedUser);

// 		return NextResponse.json({
// 			message: "User Created successfully!",
// 			success: true,
// 			savedUser,
// 		});
// 		// return NextResponse.json(
// 		// 	{ message: "User Created successfully!" },
// 		// 	{ status: 201 }
// 		// );
// 	} catch (error: any) {
// 		console.log(error);
// 		return NextResponse.json({ error: error.message }, { status: 500 });
// 	}
// }
