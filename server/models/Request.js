import mongoose from 'mongoose';
const { Schema } = mongoose;

// request made by candidate
const requestSchema = new Schema({
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
  opening_id: { 
    type: Schema.Types.ObjectId,
    required: function () { return this.status !== 'waiting'; },
    ref: "Opening"
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

export default mongoose.model("Request", requestSchema, "Requests");