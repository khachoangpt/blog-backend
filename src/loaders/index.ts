import { Express } from 'express'

import { logger } from '@/configs/logger'

import apiLoader from './api.loader'
import databaseLoader from './database.loader'

export default async (app: Express) => {
  logger.info(`Start Database Loader`)
  await databaseLoader()
  logger.info(`Success Database Loader`)

  logger.info(`Start Api Loader`)
  await apiLoader({ app })
  logger.info(`Success Api Loader`)
}
