# 🍃 Node.js & MongoDB: Backend Data Service

![Status](https://img.shields.io/badge/Status-Completed-success)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)

## 📡 Project Scope
This repository demonstrates a robust implementation of a **Server-Side Application** connecting a Node.js runtime environment with a cloud-based **MongoDB Atlas** database.

The primary objective was to master the **Object Data Modeling (ODM)** patterns using **Mongoose**, creating a seamless data flow between the client, the server, and the database. This project implements the **MVC (Model-View-Controller)** architecture to ensure separation of concerns and code scalability.

## ⚙️ Technical Architecture
- **Runtime Environment:** `Node.js` (Event-driven, non-blocking I/O).
- **Framework:** `Express.js` (Handling routing, middleware, and server logic).
- **Database:** `MongoDB Atlas` (Cloud NoSQL database).
- **ODM:** `Mongoose` (Schema validation and database interaction).
- **Architecture:** `MVC` (Models for data, Views for UI, Controllers for logic).

## 🧠 Key Backend Concepts Implemented
### 1. Database Schemas & Models
I defined strict data structures using **Mongoose Schemas** to ensure data integrity before it reaches the database.
- *Example:* A `Blog` model requiring specific fields (Title, Snippet, Body) with timestamp validations.

### 2. RESTful Routing
Implemented standardized HTTP methods to handle data operations:
- **GET:** Fetching all data or specific documents by ID.
- **POST:** Accepting user input and writing it to the database asynchronously.
- **DELETE:** Removing specific records via unique identifiers.

### 3. Asynchronous Data Handling
Utilized `async/await` patterns to handle database promises, ensuring the server remains non-blocking while waiting for database responses.

## 🛠️ How to Run Locally

Since this connects to a database, you will need your own connection string.

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/tsdebug/nodejs_mongodb
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment:**
    *   You will need to create a `.env` file (or update the connection string in `app.js` if hardcoded) with your MongoDB Atlas URI.
4.  **Start the Server:**
    ```bash
    npm start
    # OR
    node app.js
    ```
5.  Open `localhost:3000` in your browser to see the application running.

---
*Based on the Net Ninja Node.js Curriculum.*
