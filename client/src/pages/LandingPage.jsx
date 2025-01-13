import { Heart, MessageCircle, Shield, Users } from 'lucide-react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const changeLng = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-rose-400">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-8xl font-bold text-white mb-6">Tinder</h1>
        <p className="text-2xl text-rose-400 mb-4">{t("landing.header")}</p>
        <p className="text-lg text-gray-900 mb-12">{t("landing.sub_header")}</p>
        <Link 
          to="/match" className="bg-rose-400 text-white px-8 py-4 rounded-full text-lg hover:bg-rose-700 transition">
          {t("landing.start_btn")}
        </Link>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Users className="w-12 h-12 text-rose-400" />}
            title={t("landing.aimatch")}
            description={t("landing.aimatch_sub")}
          />
          <FeatureCard
            icon={<MessageCircle className="w-12 h-12 text-rose-400" />}
            title={t("landing.chat")}
            description={t("landing.chat_sub")}
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-rose-400" />}
            title={t("landing.safe")}
            description={t("landing.safe_sub")}
          />
          <FeatureCard
            icon={<Heart className="w-12 h-12 text-rose-400" />}
            title={t("landing.story")}
            description={t("landing.story_sub")}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {t("landing.start_journey")}
          </h2>
          <p className="text-gray-600 mb-8">
          {t("landing.join_us")}
          </p>
          <Link 
            to="/auth"
          className="bg-rose-400 text-white px-8 py-4 rounded-full text-lg hover:bg-rose-700 transition">
            {t("landing.free_reg")}
          </Link>
        </div>
      </section>
      <div className="fixed right-6 top-4 text-white font-medium">
        <button className="hover:text-rose-400" onClick={() => changeLng("en")}>EN</button>&nbsp;&#47;&nbsp;
        <button className="hover:text-rose-400" onClick={() => changeLng("zh")}>繁中</button>
      </div>
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