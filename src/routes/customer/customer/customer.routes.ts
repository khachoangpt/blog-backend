import getMeCustomerController from '@/controllers/customer/customer/get-me/get-me.customer.controller'
import { authenticateCustomer } from '@/middlewares'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/me', router)

	router.use(authenticateCustomer)

	router.get('/', asyncHandler(getMeCustomerController))

	return router
}
