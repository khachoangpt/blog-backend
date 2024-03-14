import { authenticateAdmin } from '@/middlewares'
import { Router } from 'express'
import authAdminRoutes from './auth/auth.admin.routes'
import blogAdminRoutes from './blog/blog.admin.routes'
import meAdminRoutes from './me/me.admin.routes'

const router = Router()

export default (app: Router) => {
	app.use('/admin', router)

	authAdminRoutes(router)

	router.use(authenticateAdmin)

	blogAdminRoutes(router)
	meAdminRoutes(router)

	return router
}
