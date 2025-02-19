import express from 'express'
import contactController from '../app/Contact/contactUsController.js'
const router = express.Router()

router.post('/contact',contactController.sendEmail)

export default router