import loginCustomerController from '@/controllers/customer/auth/login/login.customer.controller'
import registerCustomerController from '@/controllers/customer/auth/register/register.customer.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/auth', router)

	router.post('/register', asyncHandler(registerCustomerController))

	router.post('/login', asyncHandler(loginCustomerController))

	return router
}
