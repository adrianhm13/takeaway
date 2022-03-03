import express from 'express'
import {userProfile, getOrdersUser, getSpecificOrderUser, createUser, loginUser} from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:userId', auth, userProfile)
router.get('/:userId/orders', auth, getOrdersUser)
router.get('/:userId/orders/:orderId', auth, getSpecificOrderUser)

router.post('/sign-up', createUser)
router.post('/login', loginUser)

export default router