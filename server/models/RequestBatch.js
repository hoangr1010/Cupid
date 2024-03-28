import mongoose from 'mongoose';
const { Schema } = mongoose;

// batch of request
const requestBatchSchema = new Schema({
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
  requesting_list: {
    type: [Schema.Types.ObjectId],
    ref: "Request",
  }
});

module.exports = mongoose.model("RequestBatch", requestBatchSchema, "RequestBatchs");