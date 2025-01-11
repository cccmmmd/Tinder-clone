import express from "express";
import passport from "passport";
import { 
  // handleFacebookCallback, 
  handleSuccess, 
  handleError, 
  handleSignout 
} from "../controllers/facebookController.js";
import { initializeFacebookStrategy } from "../config/passport-facebook.js";

const router = express.Router();

// 初始化 Facebook Strategy
initializeFacebookStrategy();

// Facebook 認證路由
router.get('/', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

// Facebook callback 路由
router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/auth/facebook/success',
    failureRedirect: '/api/auth/facebook/error',
  }),
  // handleFacebookCallback
);

// 成功、錯誤和登出路由
router.get('/success', handleSuccess);
router.get('/error', handleError);
router.get('/signout', handleSignout);

export default router;