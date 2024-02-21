/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindConfig } from '@/type'

export const validateFindConfig = <T>(config: any) => {
  const orderQuery: string[] = config.order
  if (typeof orderQuery === 'string') {
    config.order = [config.order]
  }
  config.order = buildOrderBy(config.order)

  if (typeof config.select === 'string') {
    config.select = [config.select]
  }
  return config as FindConfig<T>
}

const buildOrderBy = (orderArray: string[]) => {
  const result: { [K: string]: 'ASC' | 'DESC' } = {}
  for (const element of orderArray) {
    let orderBy = element
    if (element.startsWith('-')) {
      orderBy = orderBy.slice(1)
      result[orderBy] = 'DESC'
    } else {
      result[orderBy] = 'ASC'
    }
  }
  return result
}
