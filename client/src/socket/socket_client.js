import io from "socket.io-client";

// 根據環境決定連接位址
const SOCKET_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

// 初始化連接變數
let socket = null;

export const initializeSocket = (userId) => { // 如果已經有連接，先中斷它
	if (socket) {
		socket.disconnect();
	}

	socket = io(SOCKET_URL, { // 建立新的連接，並提供用戶ID作為認證
		auth: { userId },
	});
};

export const getSocket = () => {
	if (!socket) { // 確保連接存在
		throw new Error("Socket not initialized");
	}
	return socket;
};

export const disconnectSocket = () => { // 檢查是否有通話中的連接，如果有連接就中斷它
	if (socket) {
		socket.disconnect();
		socket = null; //將連接狀態設為空（null）
	}
};
 