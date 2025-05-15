import express from "express"
import ProposalController from "../app/proposal/proposalController.js";

const router = express.Router();

router.post('/submit', ProposalController.submitProposal);
router.get('/vendor', ProposalController.getProposals);
router.get('/all', ProposalController.getAllProposals);

export default router