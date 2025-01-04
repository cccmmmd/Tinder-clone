import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";


export const updateProfile = async (req, res) => {
    // 圖片存進 cloudinary 獲得網址再存進 db
	try {
		const { image, ...otherData } = req.body;

		let updatedData = otherData;

		if (image) {
			if (image.startsWith("data:image")) { // base64 format
				try {
					const uploadResponse = await cloudinary.uploader.upload(image);
					updatedData.image = uploadResponse.secure_url;
				} catch (err) {
					console.error(err);

					return res.status(400).json({
						success: false,
						message: "上傳發生錯誤",
					});
				}
			}
		}

		const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });

		res.status(200).json({
			success: true,
			user: updatedUser,
		});
	} catch (err) {
		console.log(err);
		
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
