import express from 'express'
import AuthenticationController from '../app/authentication/authenticationController.js';

const router = express.Router()

router.post('/login',AuthenticationController.login);
router.post('/user/login',AuthenticationController.userLogin);


export default router;
