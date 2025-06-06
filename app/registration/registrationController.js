import registrationManager from "./registrationManager.js";
import { Registration } from "../../model/registrations.js";
import Proposal from "../../model/proposal.js";

class RegistrationController {
  static async vendorData(req, res) {
    try {
      const vendorData = req.body;
      console.log("req body", req.body);
      const result = await registrationManager.vendorData(vendorData);
      console.log("[INFO] Vendor data successfully stored in the database.");
      res.status(200).json({
        message: "[INFO] Data stored successfully!",
        token: result.token,
        vendor: result.saveVendor,
      });
    } catch (error) {
      console.error("[ERROR] Failed to store vendor data:", error.message);
      res.status(500).json({ error: "[ERROR] Internal Server Error" });
    }
  }


  static async getPaginatedVendorsWithProposals(req, res) {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      // 1. Get paginated vendors
      const vendors = await Registration.find({ role: 'vendor' })
        .select('-password -__v')
        .skip(skip)
        .limit(limit)
        .lean();
  
      // 2. Extract UUIDs of fetched vendors
      const vendorUuids = vendors.map(vendor => vendor.uuid);
  
      // 3. Fetch proposals for these vendors in a single query
      const proposals = await Proposal.find({ vendorId: { $in: vendorUuids } })
        .select('-__v')
        .lean();
  
      // 4. Organize proposals by vendor UUID
      const proposalsByVendorUuid = proposals.reduce((acc, proposal) => {
        if (!acc[proposal.vendorId]) {
          acc[proposal.vendorId] = [];
        }
        acc[proposal.vendorId].push(proposal);
        return acc;
      }, {});
  
      // 5. Combine vendors with their proposals
      const vendorsWithProposals = vendors.map(vendor => ({
        ...vendor,
        proposals: proposalsByVendorUuid[vendor.uuid] || []
      }));
  
      // 6. Get total count for pagination (only count vendors)
      const totalVendors = await Registration.countDocuments({ role: 'vendor' });
      const totalPages = Math.ceil(totalVendors / limit);
  
      return res.status(200).json({
        success: true,
        data: vendorsWithProposals,
        pagination: {
          currentPage: page,
          totalPages,
          totalVendors,
          vendorsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      });
  
    } catch (error) {
      console.error("Error in getPaginatedVendorsWithProposals:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }
}

export default RegistrationController;
