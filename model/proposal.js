// models/Proposal.js

import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  // Additional Identifiers
  userId: { type: String, },
  vendorId: { type: String, },
  postId : { type : String, },
  // Vendor Details
  vendorName: { type: String, },
  vendorCompany: { type: String,},
  vendorPhone: { type: String, },
  vendorEmail: { type: String,  },
  vendorAddress: { type: String, },

  // Bid Information
  postingTitle: { type: String },
  bidDate: { type: Date},
  offerPrice: { type: Number},
  quantity: { type: Number},
  unitPrice: { type: Number},
  totalPrice: { type: Number},

  // Device Specification
  productName: { type: String },
  description: { type: String},
  modelNumber: { type: String},
  color: { type: String},
  size: { type: String},
  weight: { type: String},
  warranty: { type: String},
  deliveryTime: { type: String},

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  category: { type: String },
  approval: {
    type: String,
    enum: ["pending", "confirmed", "rejected" , "pending_financial", "ready_for_financial_round"],
    default: "pending",
  },
});

export default mongoose.model("Proposal", proposalSchema);
