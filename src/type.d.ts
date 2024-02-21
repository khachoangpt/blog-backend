import { AwilixContainer } from 'awilix'

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer
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
