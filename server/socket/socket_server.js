import { Server } from "socket.io";

let io;

const connectedUsers = new Map();
// { userId: socketId }

export const initializeSocket = (httpServer) => {
	io = new Server(httpServer, {
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true,
		},
	});
	// 身份驗證
	io.use((socket, next) => {
		const userId = socket.handshake.auth.userId;
		if (!userId) return next(new Error("Invalid user ID"));

		socket.userId = userId;
		next();
	});
	// 連接處
	io.on("connection", (socket) => {
		console.log(`User connected with socket id: ${socket.id}`); // 當有人接通時，我們記錄下他們的分機號碼（socket.id）
		connectedUsers.set(socket.userId, socket.id); //在通訊錄（connectedUsers）中記下誰使用哪個分機

		socket.on("disconnect", () => { // 當有人掛斷電話時，我們將他們從通訊錄中移除
			console.log(`User disconnected with socket id: ${socket.id}`);
			connectedUsers.delete(socket.userId);
		});
	});
};
// 管理工具
export const getIO = () => {  //隨時使用通訊系統
	if (!io) {
		throw new Error("Socket.io not initialized!");
	}
	return io;
};
// 可以查看誰在線上
export const getConnectedUsers = () => connectedUsers;
