import { createContainer } from 'awilix'
import type { Express, NextFunction, Request, Response } from 'express'

import { logger } from '@/configs/logger'

import apiLoader from './api.loader'
import databaseLoader from './database.loader'
import jobLoader from './job.loader'
import redisLoader from './redis.loader'
import repositoriesLoader from './repositories.loader'
import servicesLoader from './services.loader'

export default async (app: Express) => {
	const container = createContainer()

	// Add the registered services to the request scope
	app.use((req: Request, _res: Response, next: NextFunction) => {
		req.scope = container.createScope()
		next()
	})

	logger.info('Start Database Loader')
	await databaseLoader()
	logger.info('Success Database Loader')

	logger.info('Start Service Loader')
	await servicesLoader({ container })
	logger.info('Success Service Loader')

	logger.info('Start Repository Loader')
	await repositoriesLoader({ container })
	logger.info('Success Repository Loader')

	logger.info('Start Api Loader')
	await apiLoader({ app })
	logger.info('Success Api Loader')

	await redisLoader({ container })

	await jobLoader({ container })

	return { container }
}
