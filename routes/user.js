import express from 'express'
import UserController from '../app/user/userController.js'

const router = express.Router()

router.post('/signup', UserController.signup);
router.get('/user/getAllUsers', UserController.getPaginatedUsersWithPosts)

export default router