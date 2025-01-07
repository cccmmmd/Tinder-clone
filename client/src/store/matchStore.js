import { create } from "zustand";
import toast from "react-hot-toast";
import { fetchInstance } from "../lib/fetch";
import { getSocket } from "../socket/socket_client";


export const useMatchStore = create((set) => ({
    matches: [],
    loading: false,
    userProfiles: [],
    myMatchesLoading: false,
	userProfilesLoading: false,
	swipeState: null,

	getMatches: async () => {
		try {
			set({ myMatchesLoading: true });
            const res = await fetchInstance("/matches")
			.then(res => res.json());
			set({ matches: res.matches });
		} catch (err) {
			set({ matches: [] });
			toast.error(err || "Something went wrong");
		} finally {
			set({ myMatchesLoading: false });
		}
	},

    getUserProfiles: async () => {
		try {
			set({ userProfilesLoading: true });
            const res = await fetchInstance("/matches/user-profiles")
			.then(res => res.json());
			set({ userProfiles: res.users });
		} catch (err) {
			set({ userProfiles: [] });
			toast.error(err || "Something went wrong");
		} finally {
			set({ userProfilesLoading: false });
		}
	},
	likeProfile: async (user) => {
		try {
			await fetchInstance("/matches/like/" + user._id, {
				method: 'POST'
			});
			set({ swipeState: "liked" });
		} catch (error) {
			console.log(error);
			toast.error("發生錯誤，無法設定好感");
		} finally {
			setTimeout(() => set({ swipeState: null }), 1500);
		}
	},
	dislikeProfile: async (user) => {
		try {
			await fetchInstance("/matches/dislike/" + user._id, {
				method: 'POST'
			});
			set({ swipeState: "passed" });
		} catch (error) {
			console.log(error);
			toast.error("發生錯誤，無法設定無感");
		} finally {
			setTimeout(() => set({ swipeState: null }), 1500);
		}
	},
	// 監聽配對
	subscribeToNewMatches: () => {
		try {
			const socket = getSocket();

			socket.on("newMatch", (newMatch) => {
				set((state) => ({
					matches: [...state.matches, newMatch],
				}));
				toast.success("恭喜你！你們配對了！");
			});
		} catch (error) {
			console.log(error);
		}
	},

	unsubscribeFromNewMatches: () => {
		try {
			const socket = getSocket();
			socket.off("newMatch");
		} catch (error) {
			console.error(error);
		}
	},
	

}));