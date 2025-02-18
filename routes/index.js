import express from 'express'
import registrationRouter from './Registration.js'
import authenticationRouter from './authentication.js'
import userRouter from './user.js'
const router = express.Router()

router.use('/api', registrationRouter)
router.use('/api', authenticationRouter)
router.use('/api', userRouter)


export default router;
