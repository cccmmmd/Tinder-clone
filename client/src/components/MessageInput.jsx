import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../store/messageStore";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";

const MessageInput = ({ id }) => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const emojiPickerRef = useRef(null);
	const { t } = useTranslation();

	const { sendMessage } = useMessageStore();

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (message.trim()) {
			sendMessage( id, message);
			setMessage("");
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
				setShowEmojiPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<form onSubmit={handleSendMessage} className='flex relative'>
			<button
				type='button'
				onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-400 focus:outline-none'
			>
				<Smile size={24} />
			</button>

			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className='flex-grow p-3 pl-12 rounded-l-lg border-2 border-rose-400 
        focus:outline-none focus:ring-2 focus:ring-rose-300'
				placeholder={t("chat.share_mind")}
			/>

			<button
				type='submit'
				className='bg-rose-400 text-white p-3 rounded-r-lg 
        hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300'
			>
				<Send size={24} />
			</button>
			{showEmojiPicker && (
				<div ref={emojiPickerRef} className='absolute bottom-20 left-4'>
					<EmojiPicker
						onEmojiClick={(emojiObject) => {
							setMessage((prevMessage) => prevMessage + emojiObject.emoji);
						}}
					/>
				</div>
			)}
		</form>
	);
};
export default MessageInput;
