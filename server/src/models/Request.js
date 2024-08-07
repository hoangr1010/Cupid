import mongoose from "mongoose";
const { Schema } = mongoose;

// request made by candidate
const requestSchema = new Schema(
  {
    candidate_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    opening_id: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.status !== "waiting";
      },
      ref: "Opening",
    },
    company: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    job_posting_url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "matched", "approved", "referred"],
      required: true,
    },
    rejected_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    scale: {
      type: Number,
    },
    request_files: {
      type: [String],
    },
    compatibility: {
      type: Number,
    },
    InfoRequest: {
      isActive: {
        type: Boolean,
        default: false,
      },
      Conversation: [
        {
          sender: {
            type: String,
            required: true,
            enum: ["referrer", "candidate"],
          },
          message: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Request", requestSchema, "Requests");
