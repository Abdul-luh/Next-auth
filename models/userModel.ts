import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "please provide a username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "please provide an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "please provide a password"],
		unique: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: {
		forgotPsswordToken: String,
		forgotPsswordTokenExpiry: Date,
		verifyToken: String,
		VerifyTokenExpiry: Date,
	},
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
