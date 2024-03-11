import getMeCustomerController from '@/controllers/customer/customer/get-me.customer.controller'
import authenticateCustomer from '@/middlewares/authenticate-customer'
import { asyncHandler } from '@/utils'
import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import blogRoutes from './blog/blog.routes'
import tagRoutes from './tag/tag.routes'

const router = Router()

export default (app: Router) => {
	app.use('/customer', router)

	router.get('/', authenticateCustomer(), asyncHandler(getMeCustomerController))

	blogRoutes(router)
	authRoutes(router)
	tagRoutes(router)

	return router
}
