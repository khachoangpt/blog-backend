import type { FindConfig } from '@/type'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
	if (!orderArray) return
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
