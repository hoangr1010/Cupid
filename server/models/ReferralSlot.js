import mongoose from 'mongoose';
const { Schema } = mongoose;

const referralSlotSchema = new Schema({
  referrer_id: { 
      type: Schema.Types.ObjectId, 
      required: true, ref: "User" 
  },
  request_id: { 
    type: Schema.Types.ObjectId, 
    required: function () { return this.status !== 'waiting'; },
    ref: "RequestBatch"
  },
  company: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["waiting", "matched", "referred"],
    required: true
  },
});

module.exports = mongoose.model("ReferralSlot", referralSlotSchema, "ReferralSlots");