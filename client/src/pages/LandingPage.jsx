import { Heart, MessageCircle, Shield, Users } from 'lucide-react';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-rose-400">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-8xl font-bold text-white mb-6">Tinder</h1>
        <p className="text-2xl text-rose-400 mb-4">遇見專屬於你的浪漫</p>
        <p className="text-lg text-gray-800 mb-12">在這裡，每個相遇都是命中注定的美好</p>
        <Link 
          to="/match" className="bg-rose-400 text-white px-8 py-4 rounded-full text-lg hover:bg-rose-700 transition">
          立即開始
        </Link>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Users className="w-12 h-12 text-rose-400" />}
            title="智能配對"
            description="透過先進演算法，為你找到最適合的對象"
          />
          <FeatureCard
            icon={<MessageCircle className="w-12 h-12 text-rose-400" />}
            title="即時聊天"
            description="隨時隨地，展開浪漫對話"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-rose-400" />}
            title="安全防護"
            description="嚴格的身分驗證，創造安心交友環境"
          />
          <FeatureCard
            icon={<Heart className="w-12 h-12 text-rose-400" />}
            title="成功故事"
            description="累積超過萬對配對成功案例"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            開始你的浪漫旅程
          </h2>
          <p className="text-gray-600 mb-8">
            加入我們，與對的人相遇在對的時刻
          </p>
          <Link 
            to="/auth"
          className="bg-rose-400 text-white px-8 py-4 rounded-full text-lg hover:bg-rose-700 transition">
            免費註冊
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="text-center p-6 rounded-lg bg-white shadow-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;