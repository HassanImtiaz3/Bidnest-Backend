// models/Proposal.js

import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  // Additional Identifiers
  userId: { type: String, required: true },
  vendorId: { type: String, required: true },
  postId : { type : String, required: true},
  // Vendor Details
  vendorName: { type: String, required: true },
  vendorCompany: { type: String, required: true },
  vendorPhone: { type: String, required: true },
  vendorEmail: { type: String, required: true },
  vendorAddress: { type: String, required: true },

  // Bid Information
  postingTitle: { type: String, required: true },
  bidDate: { type: Date, required: true },
  offerPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },

  // Device Specification
  productName: { type: String, required: true },
  description: { type: String, required: true },
  modelNumber: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: String, required: true },
  warranty: { type: String, required: true },
  deliveryTime: { type: String, required: true },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  category: { type: String, required: true },
  approval: {
    type: String,
    enum: ["pending", "confirmed", "rejected" , "in process"],
    default: "pending",
  },
});

export default mongoose.model("Proposal", proposalSchema);
