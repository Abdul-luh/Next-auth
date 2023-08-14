import { AnyArray } from "mongoose";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = ({ params }: any) => {
	const router = useRouter();
	const [data, setData] = useState("nothing");
	// const handleLogout = async () => {
	// 	try {
	// 		await axios.get("/api/users/logout");
	// 		toast.success("Logout Successful");
	// 		router.push("/login");
	// 	} catch (error: any) {
	// 		console.log(error.message);
	// 		toast.error(error.message);
	// 	}
	// };

	// const getUserDetails = async () => {
	// };

	useEffect(() => {
		async () => {
			const res = await axios.get("/api/users/me");
			const result = await res.data.data;
			// console.log(res.data.data);
			setData(result);
		};
	});

	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Profile {params.id}</h1>
			<p>this is the profile page</p>
			{data === "nothing" ? (
				""
			) : (
				<>
					<h1>data.id</h1>
					<h2>data.username {data}</h2>
					<div>
						{/* <p>
							
							 {data.}
						</p>
						<p>isVerified : {data.isVerified}</p>
						<p>{data.isVerified}</p> */}
					</div>
				</>
			)}
			<button className="py-2 px-4 bg-slate-600">
				<Link href="/profile">back</Link>
			</button>
		</div>
	);
};

export default UserProfile;
