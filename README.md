# Full-Stack Quiz Management System

## 📌 Overview
This project is a **Full-Stack Quiz Management System** that allows users to create, read, update, and delete (CRUD) **domains, categories, and questions**. It provides authentication using **JWT-based authentication** and is built with the **MERN stack**.

## 🛠 Tech Stack
### **Frontend:**
- React.js (with React Router for navigation)
- Axios (for API calls)
- Tailwind CSS / Bootstrap (for styling)

### **Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication

### **Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 🚀 Features
### **🔹 Domain Management**
- Create a new **domain** (e.g., Frontend, Backend, DevOps)
- Read all **domains**
- Update a **domain name**
- Delete a **domain** (with confirmation)

### **🔹 Category Management**
- Create a new **category** under a domain (e.g., "JavaScript Basics")
- Read **categories** within their domains
- Update a **category name**
- Delete a **category** (with confirmation)

### **🔹 Question Management**
- Create a **question** under a category with **title, options, and correct answer**
- Read **questions** within a category
- Update **question content**
- Delete a **question** (with confirmation)

### **🔹 Authentication**
- User **registration** with role-based access (admin/user)
- Secure **login/logout** using JWT authentication

## 🏗️ Project Setup
### **Backend Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/codeWithBhawna/quiz-management-system.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add the following:
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```

## 📌 API Routes
### **Category Routes** (`/api/categories`)
| Method | Endpoint                          | Description |
|--------|----------------------------------|-------------|
| `POST`  | `/api/domains/:domainId/categories` | Create a new category |
| `GET`   | `/api/domains/:domainId/categories` | Get all categories of a domain |
| `PUT`   | `/api/categories/:categoryId`   | Update a category |
| `DELETE`| `/api/categories/:categoryId`   | Delete a category |

### **Question Routes** (`/api/questions`)
| Method | Endpoint                                  | Description |
|--------|------------------------------------------|-------------|
| `POST`  | `/api/categories/:categoryId/questions` | Create a new question |
| `GET`   | `/api/categories/:categoryId/questions` | Get all questions of a category |
| `PUT`   | `/api/questions/:questionId`           | Update a question |
| `DELETE`| `/api/questions/:questionId`           | Delete a question |



## 💡 Future Enhancements
- User roles (Admin, Moderator, User)
- Timer-based quiz functionality
- Quiz results and analytics

## 📜 License
This project is **open-source** and available under the **MIT License**.

## 👩‍💻 Author
**Bhawna**
- 🌐 [LinkedIn](https://linkedin.com/in/bhawna)
- 📧 Email: your-email@example.com

