import { useState } from "react";
import { Link } from "react-router-dom";
import { HandHeart } from "lucide-react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

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
