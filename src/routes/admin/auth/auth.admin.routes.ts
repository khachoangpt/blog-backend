import loginAdminController from '@/controllers/admin/auth/login/login.admin.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/auth', router)

	router.post('/login', asyncHandler(loginAdminController))

	return router
}
