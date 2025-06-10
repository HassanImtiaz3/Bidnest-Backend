import express from 'express'
import AdminController from "../app/admin/adminController.js";

const router = express.Router()

router.post('/admin/createAdmin', AdminController.createAdmin)
router.post('/admin/login', AdminController.validateAdmin);
export default router;
