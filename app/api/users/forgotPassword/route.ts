import { dbConnect } from "@/dbConfig/dbconfilg";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
const resp = NextResponse;

export const POST = async (req: NextRequest) => {
	try {
		const reqBody = await req.json();
		const { token } = reqBody;

		// from the token passed find if the user exists
		const user = await User.findOne({
			forgotPassword: token,
			forgotPasswordExpiry: { $gt: Date.now() + 360000 },
		});

		// If user doesn't exist return error
		if (!user) {
			return resp.json({ error: "Invalid token" });
		}
	} catch (error: any) {
		console.log(error.message);
		return resp.json({ error: error.message }, { status: 500 });
	}
};
