
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from '../store/authStore';
import { useMatchStore } from '../store/matchStore';
import { Dog } from "lucide-react";
import { useTranslation } from "react-i18next";

import SwipeProfile from "../components/SwipeProfile";
import SwipeState from "../components/SwipeState";

const MatchPage = () => {
	const { authUser } = useAuthStore();
  	const { getUserProfiles, loadingUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } = useMatchStore();
	
	const { t, i18n } = useTranslation();
	const changeLng = (lng) => {
		i18n.changeLanguage(lng);
	};
	useEffect(() => {
    	getUserProfiles()
	}, [getUserProfiles]);

	useEffect(() => {
		authUser && subscribeToNewMatches();

		return () => {
			unsubscribeFromNewMatches();
		};
	}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);
	
	const NoMoreProfiles = () => (
		<div className='flex flex-col items-center justify-center h-full text-center p-2'>
			<Dog className='text-rose-400 mb-6' size={80} />
			<h2 className='text-3xl font-bold text-gray-800 mb-4'>{t("match.swipte_end")}</h2>
			<p className='text-xl text-gray-600 mb-6'>{t("match.non_new_profile")}</p>
		</div>
	);

  	return (
    	<div
		className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-100 to-purple-100
		overflow-hidden'
		>
			<Sidebar />
			<div className='flex-grow flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-grow flex flex-col gap-10 justify-center items-center relative overflow-hidden'>
					{userProfiles.length > 0 && !loadingUserProfiles && (
						<>
							<SwipeState />
							<SwipeProfile />
						</>
					)}
					{loadingUserProfiles && <Loading />}
					{userProfiles.length === 0 && !loadingUserProfiles && <NoMoreProfiles />}
				</main>
			</div>
		</div>
  	)
}

export default MatchPage;

const Loading = () => {
	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			<div className='card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
				<div className='px-4 pt-4 h-3/4'>
					<div className='w-full h-full bg-gray-200 rounded-lg' />
				</div>
				<div className='card-body bg-gradient-to-b from-white to-rose-50 p-4'>
					<div className='space-y-2'>
						<div className='h-6 bg-gray-200 rounded w-3/4' />
						<div className='h-4 bg-gray-200 rounded w-1/2' />
					</div>
				</div>
			</div>
		</div>
	);
};
