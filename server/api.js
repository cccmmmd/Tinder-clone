import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import passport from "passport";

import authRoutes from "./routes/authRoutes.js";
import useRoutes from "./routes/useRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import facebookRouter from "./routes/facebookRoutes.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket_server.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(
	session({
	  resave: false,
	  saveUninitialized: true,
	  secret: process.env.SESSION_SECRET,
	})
  );
app.use(express.json({limit : "2100000kb"}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

passport.serializeUser((user, done) => { // 用戶登入成功 → serializeUser 將 ID 存入 session
	done(null, user.emails[0].value);
});
  
passport.deserializeUser(async (user, done) => { // 用戶發送新請求 → deserializeUser 用 ID 查詢用戶資料
	done(null, user);
});
  
app.use('/api/auth/facebook', facebookRouter);
app.use("/api/auth", authRoutes);
app.use("/api/user", useRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/message", messageRoutes);

httpServer.listen(PORT, () => {
    console.log("Server started at : " + PORT);
    connectDB();
});