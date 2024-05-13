import mongoose from "mongoose";

const passcodeSchema = new mongoose.Schema({
  pass_code: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 6,
  },
  gmail: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expireAt: {
    type: Date,
    default: new Date(),
    expires: 40,
  },
});

const Passcode = mongoose.model("Passcode", passcodeSchema, "Passcodes");

export default Passcode;
