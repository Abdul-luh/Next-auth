"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] =useState(false)
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const router = useRouter();

	const handleSignUp = async () => {
		try {
			setLoading(true)
			const res = await axios.post("/api/users/signup", user);
			console.log("Signup successful", res.data);
			router.push("/login");
		} catch (error: any) {
			console.log("Signup failed", error.message);
			
			toast.error(error.message);
		} finally {
			setLoading(false)
		}
	};

	useEffect(() => {
		if (
			user.username.length > 0 &&
			user.email.length > 0 &&
			user.password.length >= 4
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex w-screen h-screen flex-col text-center justify-center items-center dark:bg-gradient-to-br from-slate-800 to-zinc-500">
			<form
				onSubmit={handleSignUp}
				className="backdrop-blur-xl p-6 rounded-xl bg-white/10 flex flex-col z-10 gap-4">
				<h1 className="text-4xl capitalize">{loading ? "Processing..." : "Signup"}</h1>
				<div>
					<label className="hidden" htmlFor="username">
						Username
					</label>
					<input
						className="p-2 border-gray-400 border-b  bg-transparent outline-none hover:border-white focus:border-white"
						type="text"
						name="username"
						id="username"
						value={user.username}
						placeholder="input your username"
						onChange={(e) => {
							setUser({ ...user, username: e.target.value });
						}}
						required
					/>
				</div>

				<div>
					<label className="hidden" htmlFor="email">
						Email
					</label>
					<input
						className="p-2 border-gray-400 border-b  bg-transparent outline-none hover:border-white focus:border-white"
						type="text"
						name="email"
						id="email"
						value={user.email}
						placeholder="input your email"
						onChange={(e) => {
							setUser({ ...user, email: e.target.value });
						}}
						required
					/>
				</div>

				<div>
					<label className="hidden" htmlFor="passowrd">
						Passowrd
					</label>
					<input
						className="p-2 border-gray-400 border-b  bg-transparent outline-none hover:border-white focus:border-white"
						type="password"
						name="passowrd"
						id="passowrd"
						value={user.password}
						placeholder="input your passowrd"
						onChange={(e) => {
							setUser({ ...user, password: e.target.value });
						}}
						required
					/>
				</div>

				<div>
					<input
						className="border disabled:opacity-50 border-white disabled:hover:text-inherit  disabled:hover:bg-transparent hover:bg-white hover:text-zinc-800 rounded-xl py-2 px-4"
						type="submit"
						disabled={buttonDisabled}
						value={buttonDisabled?"diabled":"submit"}
					/>
				</div>

				<div>
					<p>
						Have an account{" "}
						<Link href={"/login"}>
							<span className="underlined">Login</span>
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Signup;
