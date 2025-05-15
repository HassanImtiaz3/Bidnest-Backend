import express from 'express'
import registrationRouter from './registration.js'
import authenticationRouter from './authentication.js'
import contactRouter from './contact.js'
import userRouter from './user.js'
import postRouter from './post.js'
import proposal from './proposal.js'
const router = express.Router()

router.use('/api', registrationRouter)
router.use('/api', authenticationRouter)
router.use('/api', userRouter)
router.use('/api', contactRouter)
router.use('/api', postRouter)
router.use('/api', proposal);
export default router;
