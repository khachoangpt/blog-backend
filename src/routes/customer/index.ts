import { Router } from 'express'

import blogRoutes from './blog/blog.routes'

const router = Router()

export default (app: Router) => {
  app.use('/customer', router)

  blogRoutes(router)

  return router
}
