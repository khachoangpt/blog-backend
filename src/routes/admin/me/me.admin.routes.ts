import getMeAdminController from '@/controllers/admin/me/get-me/get-me.admin.controller'
import { asyncHandler } from '@/utils'
import { Router } from 'express'

const router = Router()

export default (app: Router) => {
	app.use('/me', router)

	router.get('/', asyncHandler(getMeAdminController))

	return router
}
