import mongoose from "mongoose";
const { Schema } = mongoose;

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
  resume_url: {
    type: String,
  },
  picture_url: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema, "Users");

export default User;
