import 'reflect-metadata'

import app from '@/app'
import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'
import loaders from '@/loaders'

const bootstrap = async () => {
  await loaders(app)

  const server = app.listen(appConfig.port, () => {
    logger.info(`Server listening on port ${appConfig.port}`)
  })

  process.on('SIGINT', () => {
    server.close(() => logger.warn(`Exit Server!`))
  })
}

bootstrap()
