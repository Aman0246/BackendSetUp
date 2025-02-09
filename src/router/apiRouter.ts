import { Router } from 'express'
import apiController from '../controller/apiController'

const router = Router()
router.route('/self').get(apiController.self).post(apiController.postSelef)

export default router
