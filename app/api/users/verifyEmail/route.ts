import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbconfilg";

dbConnect();
const resp = NextResponse;
export const POST = async (req: NextRequest) => {
	try {
		const reqBody = await req.json();
		const { token } = reqBody;
		console.log(token);

		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});

		console.log(user);

		if (!user) {
			return resp.json({ error: "Invalid Token" }, { status: 400 });
		}

		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		await user.save();

		return resp.json({
			message: "User Verifieed successfully",
			success: true,
		});
	} catch (error: any) {
		console.log(error);
		return resp.json({ error: error.message }, { status: 500 });
	}
};
