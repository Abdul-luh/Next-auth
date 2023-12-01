"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const router = useRouter();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await fetch("/api/users/login", {
				cache: "force-cache",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const data = await res.json();
			console.log(res);

			console.log(res);

			if (res.ok) {
				console.log(data);
				console.log("Login successful");
				toast.success("Login successful");
				router.push("/profile");
			}
			if (data.error) {
				alert(data.error);
			}

			setLoading(true);
			router.push("/profile");
		} catch (error: any) {
			console.log(error.response);
			error ? console.log("Signup failed:", error.message) : null;
		} finally {
			setLoading(false);
			toast.success("please try again");
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length >= 4) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex w-screen h-screen flex-col text-center justify-center items-center dark:bg-gradient-to-br from-slate-800 to-zinc-500">
			<form
				onSubmit={handleLogin}
				className="backdrop-blur-xl p-6 rounded-xl bg-white/10 flex flex-col z-10 gap-4">
				<h1 className="text-4xl capitalize">
					{loading ? "Processing..." : "Login"}
				</h1>

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
						// autocomplete="current-password"
						pattern="[a-z0-9]{1,15}"
						title="Password should be digits (0 to 9) or alphabets (a to z)."
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
						value={buttonDisabled ? "disabled" : "submit"}
					/>
				</div>

				<div>
					<p>
						Don`t have an account{" "}
						<Link href={"/signup"}>
							<span className="underlined">Signup</span>
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
