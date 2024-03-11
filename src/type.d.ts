import type { Customer } from '@prisma/client'
import type { AwilixContainer } from 'awilix'

declare global {
	namespace Express {
		interface Request {
			scope: AwilixContainer
			customer: Customer
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
