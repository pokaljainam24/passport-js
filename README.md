# passport-js-Blog

# Jainam Vlogs - Blog Application

## 📌 Overview
This is a blog application built with Node.js, Express, MongoDB, and EJS for templating. It includes authentication features such as user registration and login.

## 🚀 Features
- User registration and login
- Blog creation, editing, and deletion
- Admin authentication and authorization
- File upload functionality

## 💂 Authentication with Passport.js

- Local strategy for username-password authentication

- Middleware for protected routes

- Sessions for maintaining authentication state

## 📂 Project Structure

```sh
📦 Jainam-Vlogs
├── 📂 configs
│   ├── database.js
├── 📂 controllers
│   ├── adminController.js
│   ├── credentialController.js
├── 📂 middleware
│   ├── adminAuth.js
│   ├── imageUploadMulter.js
├── 📂 models
│   ├── blogModel.js
├── 📂 public
│   ├── 📂 styles
│   ├── 📂 images
├── 📂 routers
│   ├── adminRoutes.js
│   ├── blogRoutes.js
│   ├── credentialRoutes.js
│   ├── index.js
├── 📂 views
│   ├── admin
│   │   ├── loginForm.ejs
│   │   ├── registerForm.ejs
│   ├── home.ejs
├── server.js
├── package.json
├── README.md

```


## 🛠️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jainam-vlogs.git
   cd jainam-vlogs
2. Install dependencies:
   ```base
   npm install
3.Start the server:
   ```bash
   node server.js
   ```

## 🔑 Authentication Flow

1. Register: Navigate to /registerForm and create an account.
2. Login: Use your credentials at /loginForm.
3. Authorization: Admin-only routes are protected by middleware.

## 🔓 Default Credentials

Username: jainam

Password: 1234

## 📸 Screenshots

1.**[Authentication Form Page]**  ![image](https://github.com/user-attachments/assets/1f259ba4-4be6-415e-b486-3c78f26b46b0) <!-- Add screenshots in a 'screenshots' folder -->

2.**[Add-Blogs Data Form Page]**  ![image](https://github.com/user-attachments/assets/738db8cb-138c-43ec-b26d-de099bb8d720) <!-- Add screenshots in a 'screenshots' folder -->

3.**[Edit-Blogs Data Form Page]**  ![image](https://github.com/user-attachments/assets/45d8ae99-baa9-48c7-942b-dfb9722061a2) <!-- Add screenshots in a 'screenshots' folder -->

4.**[View-Blog Data Page]**  ![image](https://github.com/user-attachments/assets/9e6f03f5-37f2-4ce3-a731-5614dfff3ca0) <!-- Add screenshots in a 'screenshots' folder -->

5.**[Home Page]**  ![image](https://github.com/user-attachments/assets/a830cd23-62d5-4304-bf91-db5148a25665) <!-- Add screenshots in a 'screenshots' folder -->

## 🌍 Live Demo

Welcom To 𝓙𝓪𝓲𝓷𝓪𝓶 𝓥𝓵𝓸𝓰𝓼 ...🚀 [𝓙𝓪𝓲𝓷𝓪𝓶 𝓥𝓵𝓸𝓰𝓼](https://passport-js-1.onrender.com) <!-- Replace with actual hosted link -->

## 📜 License

This project is open-source. Feel free to contribute!

## ✨ **Contributors**
    - 𝓙𝓪𝓲𝓷𝓪𝓶 

Let me know if you need any modifications! 🚀
