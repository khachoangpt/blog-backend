import type { Customer } from '@prisma/client'
import type { AwilixContainer } from 'awilix'
import type { NodeEnvEnum } from './constants'

declare global {
	namespace Express {
		interface Request {
			scope: AwilixContainer
			customer: Customer
		}
	}

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: NodeEnvEnum
			PORT: number
			JWT_SECRET: string
			DATABASE_URL: string
			REDIS_URL: string
		}
	}

	interface Error {
		status: number
	}
}

export interface FindConfig<Entity> {
	select?: (keyof Entity)[]
	skip?: number
	take?: number
	relations?: string[]
	order?: {
		[K: string]: 'ASC' | 'DESC'
	}
}
