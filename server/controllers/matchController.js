import User from "../models/User.js";

export const getUserProfiles = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);

		const users = await User.find({
			$and: [
				{ _id: { $ne: currentUser.id } },
				{ _id: { $nin: currentUser.likes } },
				{ _id: { $nin: currentUser.dislikes } },
				{ _id: { $nin: currentUser.matches } },
				{
					gender:
						currentUser.genderPreference === "both"
							? { $in: ["male", "female"] }
							: currentUser.genderPreference,
				},
				{ genderPreference: { $in: [currentUser.gender, "both"] } },
			],
		});

		res.status(200).json({
			success: true,
			users,
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const likeUser = async (req, res) => {
    try {
        const { userId } = req.params;
		const currentUser = await User.findById(req.user.id);
		const likedUser = await User.findById(userId);

        if (!likedUser) {
			return res.status(404).json({
				success: false,
				message: "找不到喜歡的對象",
			});
		}

        if (!currentUser.likes.includes(userId)) { 
            currentUser.likes.push(userId);
            await currentUser.save();

            if (likedUser.likes.includes(currentUser.id)) { //如果我 like 你，你也 like 我
			    currentUser.matches.push(userId);
                likedUser.matches.push(currentUser.id);

                await Promise.all([await currentUser.save(), await likedUser.save()]); //同時儲存
            }
        }

        res.status(200).json({
			success: true,
			user: currentUser,
		});

    } catch (err) {
        console.log(err);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}

export const dislikeUser = async (req, res) => {
    try {
        const { userId } = req.params;
		const currentUser = await User.findById(req.user.id);
        const dislikedUser = await User.findById(userId);

        if (!dislikedUser) {
            return res.status(404).json({
                success: false,
                message: "找不到不喜歡的對象",
            });
        }

        if (!currentUser.dislikes.includes(userId)) {
			currentUser.dislikes.push(userId);
			await currentUser.save();
		}

        res.status(200).json({
			success: true,
			user: currentUser,
		});

    } catch (err) {
        console.log(err);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }    
}

export const getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("matches", "name image");

        res.status(200).json({
			success: true,
			matches: user.matches,
		});
    } catch (err){
        console.log(err);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}