import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import companyRoutes from "./routes/companyRoutes.js";  
import connectDB from "./config/db.js";  

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/api/companies", companyRoutes);

// Connect to DB & Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
