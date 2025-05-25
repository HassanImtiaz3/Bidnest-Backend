import Proposal from "../../model/proposal.js";

class ProposalManager {
  static async submitProposal(data) {
    const proposal = new Proposal(data);
    return await proposal.save();
  }

  static async getProposalsByFilter({ userId, vendorId }) {
    const filter = {};
    if (userId) filter.userId = userId;
    if (vendorId) filter.vendorId = vendorId;
  
    return await Proposal.find(filter);
  }
  

  static async getAllProposals() {
    return await Proposal.find();
  }
}

export default ProposalManager;
