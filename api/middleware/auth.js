import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
			return res.status(401).json({
				success: false,
				message: "沒有權限",
			});
		}

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({
				success: false,
				message: "無權限，無效 token",
			});
		}

        const currentUser = await User.findById(decoded.id);  //signToken 中 jwt.sign({ id } 的 id

		req.user = currentUser;

        next();
    } catch (err){
        console.log(error);
       
        if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				success: false,
				message: "無權限，無效 token",
			});
		} else {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
       

    }
}