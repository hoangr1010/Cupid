import mongoose from 'mongoose';
const { Schema } = mongoose;

// batch of referral openings
const openBatchSchema = new Schema({
  batch_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  open_list: {
    type: [Schema.Types.ObjectId],
    ref: "Opening",
  }
});

module.exports = mongoose.model("OpeningBatch", requestBatchSchema, "OpeningBatchs");