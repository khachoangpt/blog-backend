import path from 'path'
import { DataSource } from 'typeorm'

import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'

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
  const connection = appConfig.db.DATABASE_CONNECTION

  const dataSource = new DataSource({
    type: 'postgres',
    url: connection,
    schema: 'public',
    migrations: [path.join(__dirname, '..', 'migrations/*.{ts,js}')],
  })

  await dataSource.initialize()

  return dataSource
}
