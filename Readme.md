# 🚀 Polling API

A RESTful Polling API built using **Node.js, Express, and MongoDB (Mongoose)**.

This API allows users to:

- Create questions
- Add options to questions
- Vote on options
- Delete questions and options with proper Constraints

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

---

## 🔌 Features

### 🟢 Questions

- Create a question
- Fetch a question with all its options
- Delete a question (only if no option has votes)
- Add option to a question

### 🟡 Options

- Delete option (only if it has no votes)
- Vote on an option (atomic operation using `$inc`)

---

## ⚠️ Business Rules

- ❌ A question **cannot be deleted** if any of its options has votes
- ❌ An option **cannot be deleted** if it has votes
- ✅ Voting is handled using MongoDB’s **atomic `$inc` operator**

---

## 🔑 API Base URL

[http://localhost:8000/api](http://localhost:8000/api)

---

## 📌 API Endpoints

### 🟢 Question Routes

| Method | Endpoint                            | Description               |
| ------ | ----------------------------------- | ------------------------- |
| POST   | `/api/questions/create`             | Create a new question     |
| POST   | `/api/questions/:id/options/create` | Add option to a question  |
| DELETE | `/api/questions/:id/delete`         | Delete a question         |
| GET    | `/api/questions/:id`                | Get question with options |

---

### 🟡 Option Routes

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| DELETE | `/api/options/:id/delete`   | Delete an option      |
| POST   | `/api/options/:id/add_vote` | Add vote to an option |

---

## 🔧 Setup Instructions (Local System)

### 1️⃣ Clone the Repository

````bash
git clone https://github.com/Juneja16/polling-system-api
cd polling-api
````

# 2️⃣ Install Dependencies

```bash
npm install
````


# 3️⃣ Create .env File

Create a `.env` file in the root directory and add:

```plaintext
PORT=8000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

# 4️⃣ Run the Server

```bash
npm start
```

# 5️⃣ Server Running

- **URL:** [http://localhost:8000](http://localhost:8000)
- **API Base:** [http://localhost:8000/api](http://localhost:8000/api)

## 🧠 Key Concepts Used

- REST API Design
- MVC Architecture
- MongoDB Relationships (Question ↔ Options)
- Atomic Updates (`$inc`)
- Global Error Handling
- Route Modularization

## 👨‍💻 Author

**Rohan Juneja**

## 📂 Project Structure

```bash
Polling API/
│
├── app/
│   ├── config/
│   │   └── db.js                  # Database connection setup
│   │
│   ├── controllers/
│   │   ├── question.controller.js # Question-related business logic
│   │   └── option.controller.js   # Option and voting logic
│   │
│   ├── models/
│   │   ├── question.model.js      # Question schema
│   │   └── option.model.js        # Option schema
│   │
│   ├── routes/
│   │   ├── index.js               # Central route loader
│   │   ├── question.routes.js     # Question endpoints
│   │   └── option.routes.js       # Option endpoints
│
├── server.js                      # Application entry point & setup
├── .env                           # Environment configuration
└── README.md                      # Project documentation
```
