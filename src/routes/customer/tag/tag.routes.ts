import getTagListCustomerController from '@/controllers/customer/tag/get-tag-list/get-tag-list.customer.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/tag', router)

	router.get('/', asyncHandler(getTagListCustomerController))

	return router
}
