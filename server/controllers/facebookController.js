import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "5d",
	});
};

// 成功登入處理
export const handleSuccess = async (req, res) => {
	console.log('@@');
	const user = req.session.passport.user;
	const token = signToken(user._id);

	res.cookie("token", token, {
		maxAge: 5 * 24 * 60 * 60 * 1000, // 5 天 毫秒
		httpOnly: true, // 預防 XSS 攻擊
		sameSite: "strict", // 預防 CSRF 攻擊
		secure: process.env.NODE_ENV === "production",
	});
	const userData = JSON.stringify(user);
	res.send(`
		<script>
			window.opener.postMessage(
				{ 	type: 'AUTH_SUCCESS', 
					user: ${userData},
					isNewUser: ${!!user.isNewUser}
				},
				'${process.env.CLIENT_URL}'
			);
			window.close();
		</script>
	`);
	};

	// 錯誤處理
	export const handleError = (req, res) => {
	res.send(`
		<script>
		window.close();
		</script>
	`);
	};

// 登出處理
export const handleSignout = async(req, res) => {
	try {
		await new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);
			resolve();
		});
		});

		res.status(200).json({
		success: true,
		message: "Successfully signed out"
		});
	} catch (err) {
		res.status(400).json({
		success: false,
		message: "Failed to sign out",
		error: err.message
		});
	}
};
