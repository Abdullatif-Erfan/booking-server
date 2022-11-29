import mongoose from "mongoose";
const AkamsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    max_price: {
      type: Number
    },
    min_price: {
        type: Number
      },
    quantity: { type: Number},
    photo: {type: String},
    bio: {type: String},
    description: {type: String}
  }
);
export default mongoose.model("Akams", AkamsSchema);
