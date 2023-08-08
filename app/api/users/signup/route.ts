import { dbConnect } from "@/dbConfig/dbconfilg";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { Yatra_One } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

dbConnect();


export async function POST(req: NextRequest) {

	try {
		const reqBody = await req.json();
		const { username, email, password } = reqBody;

		console.log(reqBody);

		// check if inputs are not empy
		if (
			(!username || username === "") &&
			(!email || email === "") &&
			(!password || password === "")
		) {
			return;
		}

		// check if users alreeady exists
		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json({ error: "User already exists" });
		}

		// hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();
		console.log(savedUser);

		return NextResponse.json({
			message: "User Created successfully!",
			success: true,
			savedUser,
		});
		// return NextResponse.json(
		// 	{ message: "User Created successfully!" },
		// 	{ status: 201 }
		// );
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
