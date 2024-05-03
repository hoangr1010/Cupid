import mongoose from "mongoose";
const { Schema } = mongoose;

// Referral opening opened by referrer
const openingSchema = new Schema(
  {
    referrer_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    request_id: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.status !== "waiting";
      },
      ref: "Request",
    },
    company: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "matched", "approved", "referred"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Opening", openingSchema, "Openings");
