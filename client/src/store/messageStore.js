import { create } from "zustand";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket_client";
import { useAuthStore } from "./authStore";
import { fetchInstance } from "../lib/fetch";

export const useMessageStore = create((set) => ({
    // 整個物件就是 state
	messages: [], // messages 是 state 的一個屬性
	loading: true,

	sendMessage: async (receiverId, message) => {
		try {
			// 讓輸入匡的訊息送出後立刻顯示在對話泡泡上
			set((state) => ({ // state 參數就代表上面整個狀態物件, messages 是 state 的一個屬性
				messages: [
					...state.messages, // state.messages 訪問當前的訊息陣列 
					{ _id: Date.now(), sender: useAuthStore.getState().authUser._id, message },
				],
			}));
            const res = await fetchInstance('/message/send', {
				method: 'POST',
				body: JSON.stringify( { receiverId, message })
			}).then(res => res.json());
			console.log("message sent", res);
		} catch (err) {
			toast.error(err || "Something went wrong");
		}
	},

	getMessages: async (userId) => {
		try {
			set({ loading: true });
            const res = await fetchInstance(`/message/conversation/${userId}`)
			.then(res => res.json());
			set({ messages: res.messages });
		} catch (err) {
			console.log(err);
			set({ messages: [] });
		} finally {
			set({ loading: false });
		}
	},

	subscribeToMessages: () => {
		const socket = getSocket();
		socket.on("newMessage", ({ message }) => {
			set((state) => ({ messages: [...state.messages, message] }));
		});
	},

	unsubscribeFromMessages: () => {
		const socket = getSocket();
		socket.off("newMessage");
	},
}));
