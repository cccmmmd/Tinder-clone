import { useState } from "react";
import { Link } from "react-router-dom";
import { HandHeart } from "lucide-react";
import { useAuthStore } from "../store/authStore";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { setAuthUserSocket } = useAuthStore();
    
    const handleFacebookLogin = async () => {
		// 使用 popup 視窗處理 OAuth
		const popup = window.open(
		  'http://localhost:3000/api/auth/facebook',
		  'facebook-login',
		  'width=600,height=600'
		);
	
		// 監聽來自 popup 的訊息
		const handleMessage = (event) => {
			// 確保訊息來源安全
			if (event.origin !== 'http://localhost:3000') return;
	  
			if (event.data.type === 'AUTH_SUCCESS') {
			  // 更新用戶狀態
			  const { user } = event.data;
			  setAuthUserSocket(user);
			  
			  // 清理
			  window.removeEventListener('message', handleMessage);
			  popup.close();
			}
		  };
	  
		  window.addEventListener('message', handleMessage);
	};

    return (
        <div
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-rose-400 p-4'>
            <div className="fixed left-6 top-6">
                <div className='flex items-center'>
                    <Link to='/' className='flex items-center space-x-2'>
                        <HandHeart className='w-8 h-8 text-white' />
                        <span className='text-2xl font-bold text-white hidden sm:inline'>Tinder</span>
                    </Link>
                </div>
            </div>
            <div className='w-full max-w-md'>
                <h2 className='text-center text-3xl font-extrabold text-white mb-8'>
                    {isLogin ? "登入 Tinder" : "建立 Tinder 新帳號"}
                </h2>

                <div className='bg-white shadow-xl rounded-lg p-8'>
                    {isLogin ? <LoginForm /> : <SignUpForm />}   
                    <br/>
                    <button
                        type='submit'
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                        bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => {handleFacebookLogin();
                    }}>
                        用 facebook 註冊 / 登入
                    </button> 
                    <div className='mt-8 text-center'>
                        <p className='text-sm text-gray-600'>
                            {isLogin ? "新朋友？" : "已經有 Tinder 帳戶了？"}
                        </p>

                        <button
                            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                            className='mt-2 text-rose-400 hover:text-rose-700 font-medium transition-colors duration-300'
                        >
                            {isLogin ? "建立 Tinder 新帳號" : "登入 Tinder"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthPage;
