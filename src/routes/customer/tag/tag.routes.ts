import { Router } from 'express'

import createTagCustomerController from '@/controllers/customer/tag/create-tag/create-tag.customer.controller'
import getTagListCustomerController from '@/controllers/customer/tag/get-tag-list/get-tag-list.customer.controller'
import { asyncHandler } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/tag', router)

  router.post('/', asyncHandler(createTagCustomerController))

  router.get('/', asyncHandler(getTagListCustomerController))

  return router
}
