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
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
  },
  resume: {
    url: {
      type: String,
      required: true,
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
});

const User = mongoose.model("User", UserSchema, "Users");

export default User;
