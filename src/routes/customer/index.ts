import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import blogRoutes from './blog/blog.routes'
import customerRoutes from './customer/customer.routes'
import tagRoutes from './tag/tag.routes'

const router = Router()

export default (app: Router) => {
	app.use('/customer', router)

	blogRoutes(router)
	authRoutes(router)
	tagRoutes(router)
	customerRoutes(router)

	return router
}
