import dotenv from 'dotenv'

dotenv.config()

export const appConfig = {
  port: process.env.PORT,
  db: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL ?? '',
    options: {},
  },
}
