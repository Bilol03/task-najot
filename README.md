# 🎓 Task & Course Management API

A simple NestJS API for managing users, students, and courses with secure JWT authentication and role-based access control.

---

## ✅ Features

- User Authentication (JWT)
- Role-based access control (`admin`, `student`)
- Admin can create and list courses
- Students can register, login, and enroll in courses
- A student cannot enroll in the same course twice
- Students can only view their own data

---

## 📦 Tech Stack

- **NestJS**
- **MongoDB (Mongoose)**
- **JWT Auth**
- **bcrypt** for password hashing

---

## 🔧 Installation

```bash
# Clone the project
git clone https://github.com/Bilol03/task-najot.git
cd task-najot

# Install dependencies
npm install

# Create `.env` file
cp example.env .env

# Start development server
npm run start:dev
```