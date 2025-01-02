import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "5d",
	});
};

export const signup = async(req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;
    try {
        if (!name || !email || !password || !age || !gender || !genderPreference) {
			return res.status(400).json({
				success: false,
				message: "輸入資料不完整",
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				success: false,
				message: "密碼需為 6 位",
			});
		}

        if (age < 18) {
			return res.status(400).json({
				success: false,
				message: "必須年滿 18 歲",
			});
		}

        const newUser = await User.create({
			name,
			email,
			password,
			age,
			gender,
			genderPreference,
		});

        const token = signToken(newUser._id);

        res.cookie("token", token, {
			maxAge: 5 * 24 * 60 * 60 * 1000, // 5 天 毫秒
			httpOnly: true, // 預防 XSS 攻擊
			sameSite: "strict", // 預防 CSRF 攻擊
			secure: process.env.NODE_ENV === "prod",
		});
        res.status(201).json({
			success: true,
			user: newUser,
		});

    } catch(err){
        console.log(err);
		
		res.status(500).json({ success: false, message: "Server error" });
    }

}

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password ) {
			return res.status(400).json({
				success: false,
				message: "輸入資料不完整",
			});
		}
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "無效的 email 或 密碼",
			});
		}

        const token = signToken(user._id);

        res.cookie("token", token, {
			maxAge: 5 * 24 * 60 * 60 * 1000, // 5 天 毫秒
			httpOnly: true, // 預防 XSS 攻擊
			sameSite: "strict", // 預防 CSRF 攻擊
			secure: process.env.NODE_ENV === "prod",
		});

        res.status(200).json({
			success: true,
			user,
		});

    } catch(err){
        console.log(err);

		res.status(500).json({ success: false, message: "Server error" });
    }

}

export const logout = async(req, res) => {
    res.clearCookie("token");
	res.status(200).json({ success: true, message: "成功登出" });
}