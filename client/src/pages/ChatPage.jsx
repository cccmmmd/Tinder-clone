import { useEffect } from "react";
import Header from "../components/Header";
import { useMessageStore } from "../store/messageStore";
import { useMatchStore } from "../store/matchStore";
import { useAuthStore } from "../store/authStore";
import { CircleUserRound, Loader, UserX } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
  const { getMatches, matches, loadingMatches } = useMatchStore();
  const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { authUser } = useAuthStore();

  const { id } = useParams();
	const match = matches.find((m) => m?._id === id);

  useEffect(() => {
		if (authUser && id) {
			getMatches();
			getMessages(id);
			subscribeToMessages();
		}
    return () => {
			unsubscribeFromMessages();
		};
	}, [getMatches, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages, id]);
  if ( loadingMatches ) return <Loading />;
  if ( !match ) return <MatchNotFound />;
  return (
    <div className='flex flex-col h-screen bg-gray-100 bg-opacity-50'>
			<Header />
			<div className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
				<div className='flex items-center mb-4 bg-white rounded-lg shadow p-3'>
          { match.image?
              <img
                src={match.image}
                className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-rose-300'
              />
              : <CircleUserRound className='text-block mr-4' />
          }
					<h2 className='text-xl font-semibold text-gray-800'>{match.name}</h2>
				</div>
        <div className='flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4'>
					{messages.length === 0 ? (
						<p className='text-center text-gray-500 py-8'>開始跟 {match.name} 對話吧～</p>
					) : (
						messages.map((msg) => (
							<div
								key={msg._id}
								className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}
							>
								<span
									className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
										msg.sender === authUser._id
											? "bg-rose-400 text-white"
											: "bg-gray-200 text-gray-800"
									}`}
								>
									{msg.message}
								</span>
							</div>
						))
					)}
				</div>
        <MessageInput id={match._id} />
      </div>
    </div>

  )
}

export default ChatPage;

const MatchNotFound = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern'>
		<div className='bg-white p-8 rounded-lg shadow-md text-center'>
			<UserX size={64} className='mx-auto text-rose-400 mb-4' />
			<h2 className='text-2xl font-semibold text-gray-800 mb-2'>沒有配對</h2>
			<p className='text-gray-600'>Oops! 配對似乎不存在或已移除... QQ</p>
			<Link
				to='/'
				className='mt-6 px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-600 transition-colors 
				focus:outline-none focus:ring-2 focus:ring-rose-300 inline-block'
			>
				回首頁
			</Link>
		</div>
	</div>
);

const Loading = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50'>
		<div className='bg-white p-8 rounded-lg shadow-md text-center'>
			<Loader size={48} className='mx-auto text-rose-400 animate-spin mb-4' />
			<h2 className='text-2xl font-semibold text-gray-800 mb-2'>載入中</h2>
			<p className='text-gray-600'>對話紀錄載入中，請稍等...</p>
			<div className='mt-6 flex justify-center space-x-2'>
				<div className='w-3 h-3 bg-rose-400 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
				<div
					className='w-3 h-3 bg-rose-400 rounded-full animate-bounce'
					style={{ animationDelay: "0.2s" }}
				></div>
				<div
					className='w-3 h-3 bg-rose-400 rounded-full animate-bounce'
					style={{ animationDelay: "0.4s" }}
				></div>
			</div>
		</div>
	</div>
);