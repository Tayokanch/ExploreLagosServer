import express from 'express'
import {createReviews, getReviews} from '../controllers/reviews.js'
const router = express.Router()

router.post('/', createReviews )
router.get('/:locationId', getReviews)

export default router
