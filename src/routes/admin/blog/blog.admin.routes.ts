import createBlogCustomerController from '@/controllers/admin/blog/create-blog/create-blog.customer.controller'
import publishBlogCustomerController from '@/controllers/admin/blog/publish-blog/publish-blog.customer.controller'
import updateBlogCustomerController from '@/controllers/admin/blog/update-blog/update-blog.customer.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/blog', router)

	router.post('/', asyncHandler(createBlogCustomerController))

	router.put('/', asyncHandler(updateBlogCustomerController))

	router.patch('/:id', asyncHandler(publishBlogCustomerController))

	return router
}
