"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
	const router = useRouter();
	const [data, setData] = useState("nothing");
	const handleLogout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logout Successful");
			router.push("/login");
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const getUserDetails = async () => {
		axios.get("/api/users/me").then((res) => {
			console.log(res.data.data);
			setData(res.data.data._id);
		});
	};

	return (
		<div className="flex flex-col items-center justify-center h-full w-full m-auto">
			<h1>Profile</h1>
			<p>this is the profile page</p>
			<hr
				style={{
					background: "gray",
					border: "1px solid gray",
					width: "250px",
				}}
			/>
			{data === "nothing" ? (
				""
			) : (
				<>
					<h2>
						<Link href={"/profile/" + data}>{data}</Link>
					</h2>
				</>
			)}
			<button
				onClick={getUserDetails}
				className="bg-purple-400 mt-4 hover:scale-105 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl ease-in duration-300 ">
				profile
			</button>
			<button
				onClick={handleLogout}
				className="bg-red-400 mt-4 hover:scale-105 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl ease-in duration-300 ">
				logout
			</button>
		</div>
	);
};

export default Profile;
