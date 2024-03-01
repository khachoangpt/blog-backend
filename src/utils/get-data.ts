import { pick } from 'lodash'

export const getData = <T, K>(object: T, select: (keyof T)[]) => {
	return pick<T>(object, select) as K
}
