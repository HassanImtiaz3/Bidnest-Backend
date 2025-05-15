import Proposal from "../../model/proposal.js";

class ProposalManager {
  static async submitProposal(data) {
    const proposal = new Proposal(data);
    return await proposal.save();
  }

  static async getProposalsByVendor(userId) {
    return await Proposal.find({ userId: userId });
  }
  

  static async getAllProposals() {
    return await Proposal.find();
  }
}

export default ProposalManager;
