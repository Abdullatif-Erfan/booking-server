import mongoose from "mongoose";
const WebsitesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    websiteName: {
      type: String,
      required: true
    },
    postType: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
export default mongoose.model("Websites", WebsitesSchema);
