# 我的餐廳清單

![Index page about Restaurant List](./public/image/restaurantlist.png)

## 介紹

紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、CRUD

### 功能

- 查看所有餐廳
- 瀏覽餐廳的詳細資訊
- 搜尋特定餐廳
- 新增餐廳
- 編輯餐廳
- 刪除餐廳
- 註冊帳號、登入、登出
- 第三方登入 Facebook login

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

4. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   ```

5. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

6. 若欲暫停使用

   ```bash
   ctrl + c
   ```
7. 製作種子資料

   ```bash
   npm run seed
   ```

## 開發工具

- Node.js 14.16.0
- Express 4.16.4;
- Express-Handlebars 3.0.0
- Bootstrap 5.1.3
- Font-awesome 6.3.0
- MogoDB
- mongoose 5.9.7
- bcryptjs": "^2.4.3",
- body-parser": "^1.20.2",
- connect-flash": "^0.1.1",
- express-session": "^1.17.1",
- method-override": "^3.0.0",
- passport": "^0.4.1",
- passport-facebook": "^3.0.0",
- passport-local": "^1.0.0"
- dotenv": "^16.0.3"