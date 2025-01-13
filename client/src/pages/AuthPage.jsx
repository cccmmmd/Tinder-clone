import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HandHeart } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { setAuthUserSocket } = useAuthStore();

    const { t, i18n } = useTranslation();
    const changeLng = (lng) => {
        i18n.changeLanguage(lng);
    };
    const navigate = useNavigate();

    useEffect(() => {
        // 監聽來自 popup 的訊息
        const handleMessage = async(event) => {
            // 確保訊息來源安全
            if (event.origin !== 'http://localhost:3000') return;
    
            if (event.data.type === 'AUTH_SUCCESS') {
                // 更新用戶狀態
                const { user } = event.data;
                const { isNewUser } = event.data;

                await setAuthUserSocket(user, isNewUser);
                if (event.data.isNewUser) {
                    navigate('/profile');
                }
                
                // 清理
                // window.removeEventListener('message', handleMessage);
                // popup.close();
            }
        };
    
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [navigate, setAuthUserSocket]);

    const handleFacebookLogin = async () => {
        const width = 600;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
		// 使用 popup 視窗處理 OAuth
		const popup = window.open(
		  'http://localhost:3000/api/auth/facebook',
		  'facebook-login',
		  `width=${width},height=${height},left=${left},top=${top}`
		);
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
                    {isLogin ? `${t("auth.login")} Tinder` : t("auth.create_new_account")}
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
                        {t("auth.login_facebook")}
                    </button> 
                    <div className='mt-8 text-center'>
                        <p className='text-sm text-gray-600'>
                            {isLogin ? t("auth.new_friend") : t("auth.already_have")}
                        </p>
                        <button
                            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                            className='mt-2 text-rose-400 hover:text-rose-700 font-medium transition-colors duration-300'
                        >
                            {isLogin ? t("auth.create_new_account") : `${t("auth.login")} Tinder`}
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed right-6 top-4 text-white font-medium">
                <button onClick={() => changeLng("en")}>EN</button>&nbsp;&#47;&nbsp;
                <button onClick={() => changeLng("zh")}>繁中</button>
            </div>
        </div>
    );
};
export default AuthPage;
