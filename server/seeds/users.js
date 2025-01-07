import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const mNames = [
    "鍾志明",
    "周家豪",
    "郭建宏",
    "劉俊傑",
    "陳文傑",
    "張政宏",
    "屈志豪",
    "李建志",
    "王俊良",
    "江凱傑",
    "陳家正",
    "林耀華"
   ];
   
   const fNames = [
    "王淑芬",
    "郭美玲",
    "張雅婷",
    "季佳琪", 
    "陳曉琳",
    "劉怡君",
    "張靜怡",
    "王佳穎",
    "李芳瑜",
    "張雅雯",
    "游淑惠",
    "黃怡婷",
    "周嘉玲"
   ];
   const genderPreferences = ["male", "female", "both"];
   const bioDescriptions = [
    "咖啡成癮者",
    "手搖成穩",
    "貓人",
    "愛狗人士",
    "美食主義者",
    "健身愛好者",
    "愛書人",
    "電影迷",
    "大E人",
    "大I人",
    "音樂愛好者",
    "旅遊狂熱者",
    "海島控",
    "滑雪控",
    "都市人",
    "戶外運動愛好者",
    "追劇達人",
    "瑜珈愛好者",
    "精釀啤酒品鑑家",
    "壽司控",
    "冒險家",
    "夜貓族",
    "早起鳥",
    "料理達人",
    "吃貨"
   ];
const generateBio = () => {
	const descriptions = bioDescriptions.sort(() => 0.5 - Math.random()).slice(0, 3);
	return descriptions.join(" | ");
};

const generateRandomUser = (gender, index) => {
	const names = gender === "male" ? mNames : fNames;
    const age = Math.floor(Math.random() * (40 - 18 + 1) + 18);
	const name = names[index];
    const randomStr = () => {
        return Array(3)
            .fill()
            .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
            .join('');
    };
	
	return {
		name,
		email: `${randomStr()}${age}@test.com`,
		password: bcrypt.hashSync("123456", 10),
		age,
		gender,
		genderPreference: genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
		bio: generateBio(),
		image: `/${gender}/${gender === 'male' ? 'm' : 'f'}${index + 1}.png`,
	};
};

const seedUsers = async () => {
	try {
        const url = process.env.URI;
		await mongoose.connect(url);

		await User.deleteMany({});  //刪除原有所有資料

		const maleUsers = mNames.map((_, i) => generateRandomUser("male", i));
		const femaleUsers = fNames.map((_, i) => generateRandomUser("female", i));
		const allUsers = [...maleUsers, ...femaleUsers];

		await User.insertMany(allUsers);

		console.log("資料庫成功建立測試 user data");
	} catch (error) {
		console.error("Error database:", error);
	} finally {
		mongoose.disconnect();
	}
};

seedUsers();
