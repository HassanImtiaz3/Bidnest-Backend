import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  uuid: { type: String },
  contactName: { type: String, required: true },
  companyName: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  budget: { type: String, required: true },
  deadline: { type: Date, required: true },
  deliveryLocation: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  file: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Post", postSchema);
