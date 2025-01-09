import { useEffect, useState } from "react";
import { X, Heart, Loader, MessageCircle, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/matchStore";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => setIsOpen(!isOpen);

	const { matches, loadingMatches, getMatches } = useMatchStore();
	

	useEffect(() => {
		getMatches();
	}, [getMatches]);
	
	return (
		<>
			<div className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300
		 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-1/4
		`}
			>
				<div className='flex flex-col h-full'>
					{/* Header */}
					<div className='p-4 pb-[27px] border-b border-rose-200 flex justify-between items-center'>
						<h2 className='text-xl font-bold text-purple-600'>你的配對</h2>
						<button
							className='lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none'
							onClick={toggleSidebar}
						>
							<X size={24} />
						</button>
					</div>

					<div className='flex-grow overflow-y-auto p-4 z-10 relative'>
						{loadingMatches ? (
							<div className='flex flex-col items-center justify-center h-full text-center'>
								<Loader className='text-rose-500 mb-4 animate-spin' size={48} />
								<h3 className='text-xl font-semibold text-gray-700 mb-2'>載入中</h3>
								<p className='text-gray-500 max-w-xs'>正在載入您的美好配對...請稍等...</p>
							</div>
						) : matches && matches.length === 0 ? (
							<div className='flex flex-col items-center justify-center h-full text-center'>
								<Heart className='text-rose-400 mb-4' size={48} />
								<h3 className='text-xl font-semibold text-gray-700 mb-2'>尚未有配對</h3>
								<p className='text-gray-500 max-w-xs'>
									多滑幾下，很快就有配對嘍！
								</p>
							</div>
						) : (
							matches && matches.map((match) => (
								<Link key={match._id} to={`/chat/${match._id}`}>
									<div className='flex items-center mb-4 cursor-pointer hover:bg-rose-50 p-2 rounded-lg transition-colors duration-300'>
									{ match.image ? (
										<img
										src={match.image}
										alt='User avatar'
										className='size-12 object-cover rounded-full mr-3 border-2 border-rose-300'
										/>
										) : (
											<CircleUserRound className='text-black mr-2' />
										)
									}
									<h3 className='font-semibold text-gray-800'>{match.name}</h3>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>

			<button
				className='lg:hidden fixed top-20 left-0 p-6 bg-purple-500 text-white rounded-r-2xl z-10'
				onClick={toggleSidebar}
			>
				<MessageCircle size={24} />
			</button>
		</>
	);
};
export default Sidebar;
