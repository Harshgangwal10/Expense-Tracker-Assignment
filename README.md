#  Expense Tracker (MERN Stack)

---

## 🚀 Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Harshgangwal10/Expense-Tracker-Assignment.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file

Inside the **backend** folder, create a file named `.env` and add:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker
```

#### Run the backend server

```bash
npm run dev
```

The backend will start at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Create a `.env` file

Inside the **frontend** folder, create a file named `.env` and add:

```
VITE_API_BASE_URL_LOCAL=http://localhost:5000
```

#### Run the frontend

```bash
npm run dev
```

The frontend will start at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 📁 Folder Structure

```
EXPENSE_TRACKER/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   ├── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    ├── .env
    ├── vite.config.js
    ├── package.json
```

---

## 🧩 Tech Stack

* **Frontend:** React (Vite), Hooks, TailwindCSS 
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
  

---
