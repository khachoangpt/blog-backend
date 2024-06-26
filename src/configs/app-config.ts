import { NodeEnvEnum } from '@/constants'
import dotenv from 'dotenv'

dotenv.config()

export const appConfig = {
	port: process.env.PORT ?? 8000,
	jwt_secret: process.env.JWT_SECRET ?? 'secret',
	env: process.env.NODE_ENV ?? NodeEnvEnum.development,
	database: {
		url: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/backend',
	},
	redis: {
		url: process.env.REDIS_URL ?? 'redis://localhost:6379',
		options: {},
	},
}
