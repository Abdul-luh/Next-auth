import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This funvtions can be marked "async" if using await inside

export function middleware(req: NextRequest) {
	const resp = NextResponse;
	const path = req.nextUrl.pathname;

	const isPublicPath = path === "/login" || path === "/signup";

	const token = req.cookies.get("token")?.value || "";

	if (isPublicPath && token) {
		return resp.redirect(new URL("/profile", req.nextUrl));
	}

	if (!isPublicPath && !token) {
		return resp.redirect(new URL("/login", req.nextUrl));
	}
}

// see "Matching paths" below to learn more
export const config = {
	matcher: ["/", "/profile", "/login", "/signup"],
};
