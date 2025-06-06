import express from 'express'
import AdminController from "../app/admin/adminController.js";

const router = express.Router()

router.post('/admin/createAdmin', AdminController.createAdmin)

export default router;
