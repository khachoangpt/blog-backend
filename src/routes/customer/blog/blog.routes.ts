import { Router } from 'express'

import createBlogCustomerController from '@/controllers/customer/blog/create-blog/create-blog.customer.controller'
import getListBlogCustomerController from '@/controllers/customer/blog/get-list-blog/get-list-blog.customer.controller'
import updateBlogCustomerController from '@/controllers/customer/blog/update-blog/update-blog.customer.controller'
import { asyncHandler } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/blog', router)

  router.post('/', asyncHandler(createBlogCustomerController))

  router.put('/', asyncHandler(updateBlogCustomerController))

  router.get('/', asyncHandler(getListBlogCustomerController))
  return router
}
