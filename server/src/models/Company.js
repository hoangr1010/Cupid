import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  logo: {
    type: String
  },
  description: String,
  short_description: String,
  url: String,
  twitter: String,
  crunchbase: String,
  linkedin: String,
  year_founded: Number,
  company_size: String,
  benefits: [String], 
  values: [String],
  url_safe_slug: String,
  verified: Boolean,
  featured_recruiter: {
    id: String,
    organization_id: String,
    user: {
      first_name: String,
      last_name: String,
      profile_picture: String,
    },
  },
  featured_recruiter_info: String,
  featured_title: String,
  funding_stage: String,
  customer_type: String,
  funding_total: Number,
});

const Company = mongoose.model("Company", companySchema, "Companies");
companySchema.index({ name: 1, _id: 1 });

export default Company;
