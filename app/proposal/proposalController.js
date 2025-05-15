import ProposalManager from './proposalManager.js';

class ProposalController {
  static async submitProposal(req, res) {
    try {
      const proposalData = req.body;
      const result = await ProposalManager.submitProposal(proposalData);

      if (result) {
        return res.status(200).json({
          message: "Proposal submitted successfully",
          proposal: result
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
      const userId = req.query.userId;
      console.log("Incoming userId:", userId); // 👈 Confirm this prints correctly

      if (!userId) {
        return res.status(400).json({ message: "Missing vendorId in query" });
      }

      const results = await ProposalManager.getProposalsByVendor(userId);

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
}

export default ProposalController;
