
<img width="606" alt="Screenshot 2025-01-14 at 16 33 14" src="https://github.com/user-attachments/assets/66e3cc2d-3e8f-4104-afcc-681f022ac784" />

# Dating App (Tinder Clone)

一個基於 MERN (MongoDB, Express, React, Node.js) 技術棧開發的交友應用程式，提供類似 Tinder 的配對和即時聊天功能。

## 功能特點

- 🔐 使用者認證
  - 電子郵件註冊/登入
  - Facebook 第三方登入
  - JWT 身份驗證
- 👥 個人資料管理
  - 照片上傳 (使用 Cloudinary)
  - 個人資訊編輯
- 💘 配對系統
  - 左右滑動配對機制
  - 個人喜好設定
- 💬 即時聊天
  - 即時訊息傳遞 (Socket.IO)
  - 表情符號支援
- 🌐 多語言支援
  - i18n 國際化
  - 自動語言檢測

## 技術架構

### 後端 (Backend)
- Node.js + Express.js
- MongoDB (使用 Mongoose ORM)
- Socket.IO 用於即時通訊
- Passport.js 處理身份驗證
- JWT 用於授權驗證
- Cloudinary 用於圖片存儲

### 前端 (Frontend)
- React (Vite 建構)
- React Router 用於路由管理
- Zustand 用於狀態管理
- Tailwind CSS + DaisyUI 用於樣式
- Socket.IO Client 用於即時通訊
- i18next 用於多語言支援

## 安裝說明

1. Clone 專案
```bash
git clone <repository-url>
cd tinder
```

2. 安裝依賴
```bash
# 安裝後端依賴
npm install

# 安裝前端依賴
cd client/
npm install
```

3. 環境設定
在後端目錄創建 `.env` 文件，添加必要的環境變數：
```env
PORT=
NAME=
PASSWORD=
URI=
JWT_SECRET=
NODE_ENV=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=""
FACEBOOK_CLIENT_ID=
FACEBOOK_SECRET_KEY=
FACEBOOK_CALLBACK_URL=""
SESSION_SECRET=
```

4. 啟動開發伺服器
```bash
# 啟動後端伺服器
npm run dev

# 啟動前端開發伺服器
cd client/
npm run dev
```

## 專案結構
```
.
├── client/                 # 前端專案目錄
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # 後端專案目錄
│   ├── api.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── socket/
└── package.json
└── README.md
```
