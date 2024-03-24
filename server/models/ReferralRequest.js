import mongoose from 'mongoose';
const { Schema } = mongoose;

const referralRequestSchema = new Schema({
  batch_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "RequestBatch"
  },
  candidate_id: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  referrer_id: { 
    type: Schema.Types.ObjectId,
    required: function () { return this.status !== 'waiting'; },
    ref: "User"
  },
  company: {
    type: String, 
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["waiting", "matched", "referred"],
    required: true,
  },
  scale: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("ReferralRequest", referralRequestSchema, "ReferralRequests");