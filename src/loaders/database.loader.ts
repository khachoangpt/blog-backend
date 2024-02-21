import { logger } from '@/configs/logger'
import dataSource from '@/configs/ormconfig'

export default async () => {
  try {
    const dataSource = await connectPostgres()
    logger.info(`Connect Database Success`)
    return { dataSource }
  } catch (error) {
    logger.error(`Error Database Connect::`, error)
    process.exit(1)
  }
}

const connectPostgres = async () => {
  await dataSource.initialize()

  return dataSource
}
