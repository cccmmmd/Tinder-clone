import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";

import authRoutes from "./routes/authRoutes.js";
import useRoutes from "./routes/useRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket_server.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(express.json({limit : "2100000kb"}));
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/user", useRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/message", messageRoutes);

httpServer.listen(PORT, () => {
    console.log("Server started at : " + PORT);
    connectDB();
});