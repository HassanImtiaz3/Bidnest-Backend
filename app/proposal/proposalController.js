import ProposalManager from "./proposalManager.js";
import Proposal from "../../model/proposal.js";

class ProposalController {
  static async submitProposal(req, res) {
    try {
      const proposalData = req.body;
      const result = await ProposalManager.submitProposal(proposalData);

      if (result) {
        return res.status(200).json({
          message: "Proposal submitted successfully",
          proposal: result,
        });
      } else {
        return res.status(400).json({ message: "Failed to submit proposal" });
      }
    } catch (error) {
      console.error("Error in submitting proposal:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
  static async getProposals(req, res) {
    try {
      const { userId, vendorId } = req.query;
      console.log("Incoming userId:", userId, "vendorId:", vendorId);

      if (!userId && !vendorId) {
        return res
          .status(400)
          .json({ message: "Provide at least userId or vendorId in query" });
      }

      const results = await ProposalManager.getProposalsByFilter({
        userId,
        vendorId,
      });

      return res.status(200).json({
        message: "Proposals fetched successfully",
        proposals: results,
      });
    } catch (error) {
      console.error("Error fetching proposals:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
  static async getAllProposals(req, res) {
    try {
      const results = await ProposalManager.getAllProposals();

      return res.status(200).json({
        message: "All proposals fetched successfully",
        proposals: results,
      });
    } catch (error) {
      console.error("Error fetching all proposals:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
  static async updateProposalStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (
        ![
          "approved",
          "rejected",
          "pending",
          "ready_for_financial_round",
          "bid_successful",
        ].includes(status)
      ) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const updatedProposal = await Proposal.findByIdAndUpdate(
        id,
        { approval: status },
        { new: true }
      );

      if (!updatedProposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      return res.status(200).json({
        message: "Proposal status updated successfully",
        proposal: updatedProposal,
      });
    } catch (error) {
      console.error("Error updating proposal status:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
  static async updateProposal(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedProposal = await ProposalManager.updateProposal(id, updatedData);
  
      if (!updatedProposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
  
      return res.status(200).json({
        message: "Proposal updated successfully",
        proposal: updatedProposal,
      });
    } catch (error) {
      console.error("Error updating proposal:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
  
}

export default ProposalController;
