import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/matchStore";
import { CircleUserRound } from "lucide-react";

const SwipeProfile = () => {
    const {userProfiles, likeProfile, dislikeProfile} = useMatchStore();

    const handleSwipe = (dir, user) => {
		if (dir === "right") likeProfile(user);
		else if (dir === "left") dislikeProfile(user);
	};

    return (
        <div className='relative w-full max-w-sm h-[28rem]'>
			{userProfiles.map((user) => (
				<TinderCard
					className='absolute shadow-none'
					key={user._id}
					onSwipe={(dir) => handleSwipe(dir, user)}
					swipeRequirementType='position'
					swipeThreshold={100}
					preventSwipe={["up", "down"]}
				>
					<div
						className='card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border
					 border-gray-200'
					>
						<figure className='h-3/4'>
							{
							user.image? 
							<img
								src={user.image}
								alt={user.name}
								className='rounded-lg object-cover h-full w-full pointer-events-none'
							/>
							: <CircleUserRound className='text-white text-4xl' />
							}
						</figure>
						<div className='card-body bg-gradient-to-b from-white to-pink-50'>
							<h2 className='card-title text-2xl text-gray-800'>
								{user.name}, {user.age} 歲
							</h2>
							<p className='text-gray-600'>{user.bio}</p>
						</div>
					</div>
				</TinderCard>
			))}
		</div>
    )

}

export default SwipeProfile;