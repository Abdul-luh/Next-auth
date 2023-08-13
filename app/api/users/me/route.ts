import { getDataFromToken } from "@/helpers/getDataFromToken";
import { dbConnect } from "@/dbConfig/dbconfilg";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
	const resp = NextResponse;
	try {
		const userID = await getDataFromToken(req);
		console.log(userID);
		const user = await User.findOne({ _id: userID }).select("-password");
		console.log(user);
		return resp.json({
			message: "User found",
			data: user,
		});
	} catch (error: any) {
		return resp.json({ error: error.message }, { status: 400 });
	}
}
