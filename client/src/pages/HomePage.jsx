
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from '../store/authStore';
import { useMatchStore } from '../store/matchStore';

import SwipeProfile from "../components/SwipeProfile";
import SwipeState from "../components/SwipeState";



const HomePage = () => {
  const { authUser } = useAuthStore();
  const { getUserProfiles, userProfilesLoading, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
		useMatchStore();

  useEffect(() => {
    getUserProfiles()
  }, [getUserProfiles]);

  useEffect(() => {
	authUser && subscribeToNewMatches();

	return () => {
		unsubscribeFromNewMatches();
	};
}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);
  
  return (
    <div
			className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-100 to-purple-100
		 overflow-hidden'
		>
			<Sidebar />
			<div className='flex-grow flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-grow flex flex-col gap-10 justify-center items-center pt-10 relative overflow-hidden'>
					{userProfiles.length > 0 && !userProfilesLoading && (
						<>
							<SwipeState />
							<SwipeProfile />
						</>
					)}

					{/* {userProfiles.length === 0 && !userProfilesLoading && <NoMoreProfiles />}

					{userProfilesLoading && <LoadingUI />} */}
				</main>
			</div>
		</div>
  )
}

export default HomePage;