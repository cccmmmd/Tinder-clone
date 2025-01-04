import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, receiverId } = req.body;
        const newMessage = await Message.create({
			sender: req.user.id,
			receiver: receiverId,
			message,
		});

        res.status(201).json({
			success: true,
			message: newMessage,
		});
    } catch (err){
        console.log(err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
};

export const getConversation = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({
			$or: [
				{ sender: req.user._id, receiver: userId },
				{ sender: userId, receiver: req.user._id },
			],
		}).sort("createdAt");

    }catch (err){
        console.log(err);


    }
    
};