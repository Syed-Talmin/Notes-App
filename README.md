
# 📝 Notes App

A full-stack **Notes Management App** built with React (frontend) and Node.js + Express (backend).  
It includes authentication (JWT), CRUD operations, responsive UI, and secure data handling using MongoDB.

---

## 🚀 Tech Stack

**Frontend:** React + TailwindCSS  
**Backend:** Node.js + Express  
**Database:** MongoDB (Atlas)  
**Auth:** JWT-based Authentication  

---

## ⚙️ Environment Variables

### 🖥 Backend (`server/.env.example`)

```

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY = your_gemini_api_key
FRONTEND_URL = your_frontend_url

```

### 💻 Frontend (`client/.env.example`)

```

VITE_API_BASE_URL=[https://your-backend.onrender.com](https://your-backend.onrender.com)

````

> ⚠️ Create `.env` files based on these examples and **do not commit actual credentials** to GitHub.

---

## 🧑‍💻 Run Locally

### 1️⃣ Clone repo
```bash
https://github.com/Syed-Talmin/Notes-App.git
cd notes-app
````

### 2️⃣ Setup backend

```bash
cd Backend
npm install
npm run dev
```

### 3️⃣ Setup frontend

```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🌍 Deployment Links

* **Frontend:** [Frontend_Link](https://notes-app-tsk.vercel.app/)
* **Backend API:** [Backend_Link](https://notes-app-0rf8.onrender.com)

---

## 🧩 Core Features

✅ User Signup / Login / Logout
✅ JWT-based authentication
✅ Protected routes
✅ CRUD operations for Notes
✅ Search & Filter functionality
✅ Responsive Dashboard
✅ Profile update

---

## 📬 API Documentation

**Postman Collection:** [`postman_collection.json`](./postman_collection.json)

| Method   | Endpoint            | Description                  |
| -------- | ------------------- | ---------------------------- |
| `POST`   | `/api/auth/signup`  | Register new user            |
| `POST`   | `/api/auth/login`   | Login existing user          |
| `GET`    | `/api/user/profile` | Fetch logged-in user profile |
| `PUT`    | `/api/user/profile` | Update user profile          |
| `GET`    | `/api/notes`        | Get all notes                |
| `POST`   | `/api/notes`        | Create a new note            |
| `PUT`    | `/api/notes/:id`    | Update a note                |
| `DELETE` | `/api/notes/:id`    | Delete a note                |

---

## 🔐 Security

* Passwords hashed with **bcrypt**
* **JWT authentication** middleware for protected routes
* Input validation on both client and server
* CORS protection for frontend-backend communication

---

## 🧱 Scaling for Production

* Frontend hosted on **Vercel**
* Backend hosted on **Render**
* Database hosted on **MongoDB Atlas**
* Add rate limiting and request validation
* Use environment variables for configuration

---

## 🧰 Folder Structure

```
notes-app/
├── Frontend/              # React frontend
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── ...
│
├── Backend/              # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── .env.example
│   ├── package.json
│   └── ...
│
└── postman_collection.json
```

---

## 🧾 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Author

**Syed Talmin**
🔗 [GitHub](https://github.com/Syed-Talmin/)
📧 [saiyedsufyan7@gmail.com](mailto:saiyedsufyan7@gmail.com)

---

