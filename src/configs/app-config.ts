import dotenv from 'dotenv'

import { NodeEnvEnum } from '@/constants'

dotenv.config()

export const appConfig = {
  port: process.env.PORT,
  env: (process.env.NODE_ENV as NodeEnvEnum) ?? NodeEnvEnum.DEVELOPMENT,
  db: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL ?? '',
    options: {},
  },
}
