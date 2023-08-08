import { AnyArray } from "mongoose";
import React from "react";

const UserProfile = ({ params }: any) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Profile {params.id}</h1>
			<p>this is the profile page</p>
		</div>
	);
};

export default UserProfile;
