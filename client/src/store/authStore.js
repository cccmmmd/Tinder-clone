import { create } from "zustand";
import { fetchInstance } from "../lib/fetch";
import toast from "react-hot-toast";
import { initializeSocket, disconnectSocket } from "../socket/socket_client";

export const useAuthStore = create((set) => ({
	authUser: null,
	checkingAuth: true,
	loading: false,

	signup: async (data) => {
		try {
			set({ loading: true });
			const res = await fetchInstance('/auth/signup', {
				method: 'POST',
				body: JSON.stringify(data)
			}).then(res => res.json());
			if(res.success) {
				set({authUser: res.user});
				initializeSocket(res.user._id);
				toast.success("帳號建立成功！");
			} else {
				toast.error(res.message);
			}
		} catch (err) {
			toast.error(err || "Something went wrong");
		} finally {
			set({loading: false});
		}
	},
	login: async (data) => {
		try {
			set({ loading: true });
			const res = await fetchInstance('/auth/login', {
				method: 'POST',
				body: JSON.stringify(data)
			}).then(res => res.json());
			if(res.success) {
				set({authUser: res.user});
				initializeSocket(res.user._id);
				toast.success("成功登入！");
			} else {
				toast.error(res.message);
			}
		} catch (err) {
			toast.error(err || "Something went wrong");
		} finally {
			set({loading: false});
		}
	},
	logout: async() => {
		try {
			const res = await fetchInstance('/auth/logout', {
				method: 'POST',
			}).then(res => res.json());
			if(res.success) {
				set({ authUser: null });
				disconnectSocket();
				toast.success(res.message);
			}
		} catch (err) {
			console.log(err);
			//toast.error(err || "Something went wrong");
		}
	},
	setAuthUser: (user) => set({ authUser: user }),
	checkAuth: async() => {
		try {
			const res = await fetchInstance('/auth/me')
			.then(res => res.json());
			initializeSocket(res.user._id);
			set({ authUser: res.user });
		} catch (err) {
			set({ authUser: null });
			console.log(err);
		} 
		finally {
			set({ checkingAuth: null });
		}
	},
}));