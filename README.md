📌 Company Management API

A simple CRUD REST API built with Node.js, Express, MongoDB, and Mongoose to manage company data.

🚀 Features

Create a new company

Read all companies or filter by industry / location

Read single company by ID

Update company details

Delete a company

Timestamps added automatically (createdAt, updatedAt)

⚙️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Tools: dotenv, CORS, Postman

📂 Project Setup
1. Clone the repo
git clone <your-repo-url>
cd <your-project-folder>

2. Install dependencies
npm install

3. Setup Environment Variables

Create a .env file in the root folder:

PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/companydb

4. Start the server
npm run dev


The server will run at:
👉 http://localhost:8000/api/companies
