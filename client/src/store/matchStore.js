import { create } from "zustand";
import toast from "react-hot-toast";
import { fetchInstance } from "../lib/fetch";


export const useMatchStore = create((set) => ({
    matches: [],
    loading: false,
    userProfiles: [],
    myMatchesLoading: false,
	userProfilesLoading: false,

	getMatches: async () => {
		try {
			set({ myMatchesLoading: true });
            const res = await fetchInstance('/matches')
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
            const res = await fetchInstance('/matches/user-profiles')
			.then(res => res.json());
			set({ userProfiles: res.users });
		} catch (err) {
			set({ userProfiles: [] });
			toast.error(err || "Something went wrong");
		} finally {
			set({ userProfilesLoading: false });
		}
	},
}));