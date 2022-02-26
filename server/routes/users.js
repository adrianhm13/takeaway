import express from 'express'
import {userProfile, getOrdersUser, getSpecificOrderUser} from '../controllers/users.js'

const router = express.Router()

router.get('/:userId', userProfile)
router.get('/:userId/orders', getOrdersUser)
router.get('/:userId/orders/:orderId', getSpecificOrderUser)

export default router