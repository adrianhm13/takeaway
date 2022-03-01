import express from 'express'
import {userProfile, getOrdersUser, getSpecificOrderUser, createUser, loginUser} from '../controllers/users.js'

const router = express.Router()

router.get('/:userId', userProfile)
router.get('/:userId/orders', getOrdersUser)
router.get('/:userId/orders/:orderId', getSpecificOrderUser)

router.post('/sign-up', createUser)
router.post('/login', loginUser)

export default router