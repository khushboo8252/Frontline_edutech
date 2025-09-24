import express from "express";
import { 
  createCompany, 
  getCompanies, 
  getCompanyById, 
  updateCompany, 
  deleteCompany 
} from "../controllers/companyController.js";

const router = express.Router();

// Create a new company
router.post("/", createCompany);

// Get all companies with optional filters
router.get("/", getCompanies);

// Get a single company by ID
router.get("/:id", getCompanyById);

// Update a company by ID
router.put("/:id", updateCompany);

// Delete a company by ID
router.delete("/:id", deleteCompany);

export default router;
