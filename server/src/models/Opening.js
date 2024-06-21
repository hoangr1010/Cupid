import mongoose from "mongoose";
const { Schema } = mongoose;

// Referral opening opened by referrer
// const openingSchema = new Schema(
//   {
//     referrer_id: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     request_id: {
//       type: Schema.Types.ObjectId,
//       required: function () {
//         return this.status !== "waiting";
//       },
//       ref: "Request",
//     },
//     company: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["waiting", "matched", "approved", "referred"],
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

const openingSchema = new Schema(
  {
    referrer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    request_id_list: {
      type: [{ type: Schema.Types.ObjectId, ref: "Request" }],
      default: [],
    },
    original_amount: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Opening", openingSchema, "Openings");
