# 📒 Note Taker App

A full-stack MERN (MongoDB, Express, React, Node.js) application to create, manage, and store notes securely.  
This project is divided into two parts: **Server** (backend) and **Client** (frontend).

---

## 🚀 Features
- Add, edit, and delete notes  
- Secure user authentication (with Google OAuth / Email & Password)  
- Responsive UI with React + TailwindCSS  
- MongoDB as the database  
- JWT Authentication with cookies  

---

## 📂 Project Structure
NoteTaker/
│── Server/ # Backend (Express + MongoDB)
│ ├── .env # Environment variables (not pushed to GitHub)
│ ├── package.json
│ └── ...
│
│── Client/ # Frontend (React + Vite)
│ ├── .env # Environment variables (not pushed to GitHub)
│ ├── package.json
│ └── ...
│
│── README.md
│── .gitignore



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/NoteTaker.git
cd NoteTaker


2️⃣ Install Dependencies

For server:

cd Server
npm install

For client:

cd ../Client
npm install


3️⃣ Add Environment Variables

Create a .env file inside both Server and Client folders.

Server/.env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id


Client/.env

VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:5000
