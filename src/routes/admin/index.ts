import { Router } from 'express'
import blogAdminRoutes from './blog/blog.admin.routes'

const router = Router()

export default (app: Router) => {
	app.use('/admin', router)

	blogAdminRoutes(router)

	return router
}
