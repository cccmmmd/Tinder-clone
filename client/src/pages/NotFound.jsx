import { Link } from "react-router-dom"
import { Bird } from 'lucide-react';
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const NotFound = () => {
	const { t } = useTranslation();
	return (
		<div className='flex flex-col flex-row min-h-screen bg-gradient-to-br from-rose-100 to-purple-100 overflow-hidden'>
			<Header />
			<div className='text-center flex flex-col justify-center items-center h-96 mt-10'>
				
					<Bird size={80} className="text-8xl text-rose-400 mb-6" />
					<h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
					<Link
						to="/"
						className="mt-6 px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-600 transition-colors 
					focus:outline-none focus:ring-2 focus:ring-rose-300 inline-block"
						>{t("chat.go_home")}
						</Link>
			</div>
		</div>
  	)
}

export default NotFound