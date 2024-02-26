import { Router } from 'express'

import authRoutes from './auth/auth.routes'
import blogRoutes from './blog/blog.routes'

const router = Router()

export default (app: Router) => {
  app.use('/customer', router)

  blogRoutes(router)
  authRoutes(router)

  return router
}
