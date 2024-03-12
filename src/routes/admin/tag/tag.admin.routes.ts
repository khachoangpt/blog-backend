import createTagCustomerController from '@/controllers/admin/tag/create-tag/create-tag.customer.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/tag', router)

	router.post('/', asyncHandler(createTagCustomerController))

	return router
}
