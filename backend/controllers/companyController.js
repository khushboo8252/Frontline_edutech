import Company from "../models/Company.js";

// Create a company
export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get companies with filters
export const getCompanies = async (req, res) => {
  try {
    const { name, industry, location, minSize, maxSize } = req.query;

    let filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (industry) filter.industry = industry;
    if (location) filter.location = location;
    if (minSize) filter.size = { ...filter.size, $gte: Number(minSize) };
    if (maxSize) filter.size = { ...filter.size, $lte: Number(maxSize) };

    const companies = await Company.find(filter);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a company
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
