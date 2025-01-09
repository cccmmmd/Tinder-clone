import Message from "../models/Message.js";
import { getConnectedUsers, getIO } from "../socket/socket_server.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, receiverId } = req.body;
        const newMessage = await Message.create({
			sender: req.user.id,
			receiver: receiverId,
			message,
		});

		// socket.io
		const io = getIO(); // 取得通訊中心（Socket.io 伺服器）
		const connectedUsers = getConnectedUsers(); //得知誰在線上
		const receiverSocketId = connectedUsers.get(receiverId); // 查找接收者的位置(id)

		if (receiverSocketId) { // 如果找到接收者的位置
			io.to(receiverSocketId).emit("newMessage", { // emit 發送消息到特定位置
				message: newMessage,
			});
		}

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
		
		res.status(200).json({
			success: true,
			messages,
		});

    }catch (err){
        console.log(err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
    
};