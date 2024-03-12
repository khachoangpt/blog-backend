import getBlogDetailCustomerController from '@/controllers/customer/blog/get-blog-detail/get-blog-detail.customer.controller'
import getListBlogCustomerController from '@/controllers/customer/blog/get-list-blog/get-list-blog.customer.controller'
import { authenticateCustomer } from '@/middlewares/authenticate-customer'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/blog', router)

	router.get('/', asyncHandler(getListBlogCustomerController))

	router.use(authenticateCustomer)

	router.get('/:id', asyncHandler(getBlogDetailCustomerController))

	return router
}
