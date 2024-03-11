import createTagCustomerController from '@/controllers/customer/tag/create-tag/create-tag.customer.controller'
import getTagListCustomerController from '@/controllers/customer/tag/get-tag-list/get-tag-list.customer.controller'
import { authenticateCustomer } from '@/middlewares/authenticate-customer'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/tag', router)

	router.get('/', asyncHandler(getTagListCustomerController))

	router.use(authenticateCustomer)

	router.post('/', asyncHandler(createTagCustomerController))

	return router
}
