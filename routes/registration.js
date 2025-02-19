import express from 'express'
import RegistrationController from '../app/registration/registrationController.js';

const router = express.Router()

router.post('/registration', RegistrationController.vendorData);

export default router;
