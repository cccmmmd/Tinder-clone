import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const initializeFacebookStrategy = () => {
  passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_SECRET_KEY,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'emails', 'name', 'displayName', 'photos' ],
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await User.findOne({
                    email: profile.emails[0].value
                });
            
                if (!user) {
                    console.log('Adding new facebook user to DB..');
    
                    const newUser = await User.create({
                        name: profile.displayName,
                        password: '123456',
                        email: profile.emails[0].value,
                        facebookId: profile.id,
                        age: 18, // 設定預設值或從 Facebook 獲取
                        gender: profile.gender || 'male', // 預設值或從 Facebook 獲取
                        genderPreference: 'both', // 設定預設值
                        image: profile.photos?.[0]?.value || '',
                    });
                
                    return done(null, { ...newUser.toObject(), isNewUser: true});
                } else {
                    console.log('Facebook User already exist in DB..');
                    return done(null, user);
                }
            } catch (err) {
                return done(err, null);
            }     
        }
    )
  );
};
