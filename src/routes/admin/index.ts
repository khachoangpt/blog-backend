import { authenticateAdmin } from '@/middlewares'
import { Router } from 'express'
import blogAdminRoutes from './blog/blog.admin.routes'

const router = Router()

export default (app: Router) => {
	app.use('/admin', router)

	router.use(authenticateAdmin)

	blogAdminRoutes(router)

	return router
}
