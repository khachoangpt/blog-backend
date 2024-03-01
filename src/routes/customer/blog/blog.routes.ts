import createBlogCustomerController from '@/controllers/customer/blog/create-blog/create-blog.customer.controller'
import getBlogDetailCustomerController from '@/controllers/customer/blog/get-blog-detail/get-blog-detail.customer.controller'
import getListBlogCustomerController from '@/controllers/customer/blog/get-list-blog/get-list-blog.customer.controller'
import publishBlogCustomerController from '@/controllers/customer/blog/publish-blog/publish-blog.customer.controller'
import updateBlogCustomerController from '@/controllers/customer/blog/update-blog/update-blog.customer.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/blog', router)

	router.post('/', asyncHandler(createBlogCustomerController))

	router.put('/', asyncHandler(updateBlogCustomerController))

	router.get('/', asyncHandler(getListBlogCustomerController))

	router.get('/:id', asyncHandler(getBlogDetailCustomerController))

	router.patch('/:id', asyncHandler(publishBlogCustomerController))
	return router
}
