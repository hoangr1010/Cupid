import mongoose from "mongoose";
const { Schema } = mongoose;

const EducationSchema = new Schema({
  school: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
  },
  start_year: {
    type: Number,
  },
  end_year: {
    type: Number,
  },
});

const ExperienceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // e.g., full-time, part-time, intern, etc.
  },
  start_m: {
    type: String, // Month as a number (1-12)
    required: true,
  },
  start_y: {
    type: Number, // Year as a number (e.g., 2023)
    required: true,
  },
  end_m: {
    type: String, // Month as a number (1-12)
    required: true,
  },
  end_y: {
    type: Number, // Year as a number (e.g., 2024)
    required: true,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  start_m: {
    type: String, // Month as a number (1-12)
  },
  start_y: {
    type: Number, // Year as a number (e.g., 2023)
  },
  end_m: {
    type: String, // Month as a number (1-12)
  },
  end_y: {
    type: Number, // Year as a number (e.g., 2024)
  },
  current: {
    type: Boolean,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String, // URL to the project
  },
});

const PortfolioSchema = new Schema({
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  website: {
    type: String,
  },
});

const UserSchema = new Schema({
  linkedin_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  resume: {
    url: {
      type: String,
    },
    text: {
      type: String,
      default: "",
    },
  },
  picture_url: {
    type: String,
  },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  project: [ProjectSchema],
  portfolio: [PortfolioSchema],
});

const User = mongoose.model("User", UserSchema, "Users");

export default User;
