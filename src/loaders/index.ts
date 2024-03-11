import { logger } from '@/configs/logger'
import { createContainer } from 'awilix'
import type { Express, NextFunction, Request, Response } from 'express'
import apiLoader from './api.loader'
import jobLoader from './job.loader'
import passportLoader from './passport.loader'
import redisLoader from './redis.loader'
import servicesLoader from './services.loader'

export default async (app: Express) => {
	const container = createContainer()

	// Add the registered services to the request scope
	app.use((req: Request, _res: Response, next: NextFunction) => {
		req.scope = container.createScope()
		next()
	})

	logger.info('Start Service Loader')
	await servicesLoader({ container })
	logger.info('Success Service Loader')

	await passportLoader({ app, container })

	logger.info('Start Api Loader')
	await apiLoader({ app })
	logger.info('Success Api Loader')

	await redisLoader({ container })

	await jobLoader({ container })

	return { container }
}
