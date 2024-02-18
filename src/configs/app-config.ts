import dotenv from 'dotenv'

dotenv.config()

export const appConfig = {
  port: process.env.PORT,
  db: {
    DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
  },
  redis: {
    url: process.env.REDIS_URL ?? '',
    options: {},
  },
}
