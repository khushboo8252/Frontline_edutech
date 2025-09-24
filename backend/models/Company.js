import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String },
  size: { type: Number }, 
  founded: { type: Number }, 
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
