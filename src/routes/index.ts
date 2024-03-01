import { handleError } from '@/utils'
import express, { type Express } from 'express'
import adminRoutes from './admin'
import customerRoutes from './customer'

export default (app: Express) => {
	const router = express.Router()
	app.use('/v1/api', router)

	customerRoutes(router)
	adminRoutes(router)

	// handle error
	app.use(handleError)

	return router
}
