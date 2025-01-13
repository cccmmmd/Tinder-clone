import { create } from "zustand";
import { fetchInstance } from "../lib/fetch";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useUserStore = create((set) => ({
	loading: false,

	updateProfile: async (data) => {
		try {
			set({ loading: true });
            const res = await fetchInstance('/user/update', {
				method: 'PUT',
				body: JSON.stringify(data)
			}).then(res => res.json());
        
			useAuthStore.getState().setAuthUser(res.user);
			toast.success("個人檔案已成功更新");
            setTimeout(() => {
                window.location.href = '/match'; 
            }, 1000);
		} catch (err) {
			toast.error(err || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
}));
