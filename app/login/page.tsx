"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleLogin = async () => {};

	return (
		<div className="flex w-screen h-screen flex-col text-center justify-center items-center dark:bg-gradient-to-br from-slate-800 to-zinc-500">
			<form
				onSubmit={handleLogin}
				className="backdrop-blur-xl p-6 rounded-xl bg-white/10 flex flex-col z-10 gap-4">
				<h1 className="text-4xl capitalize">Login</h1>
				<div>
					<label className="hidden" htmlFor="email">
						email
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
						type="text"
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
						className="border border-white hover:bg-white hover:text-zinc-800 rounded-xl py-2 px-4"
						type="submit"
						value={"submit"}
					/>
				</div>

				<div>
					<p>
						Have an account{" "}
						<Link href={"/signup"}>
							<span className="underlined">signup</span>
						</Link>
					</p>
				</div>
			</form>

			<div className="w-24 h-24 rounded-full absolute top-[45%] left-[20%] bg-orange-200"></div>

			<div className="w-24 h-24 rounded-full absolute top-[35%] left-[60%] border-spacing-5 border-green-200"></div>
		</div>
	);
};

export default Login;
