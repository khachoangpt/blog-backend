/**
 * Recursively get all keys of a nested object.
 * @example
 * const obj = { a: { b: { c: 1 }, d: 2 } }
 * getKeysOfNestedObject(obj) // ["a.b.c", "a.d"]
 * @param {object} obj - The nested object to get keys from
 * @returns {string[]} All keys of the nested object
 */
const getKeysOfNestedObject = (obj: object): Array<string> => {
	return Object.keys(obj).reduce(
		(acc, key) => {
			const value = obj[key as keyof typeof obj]
			if ((value as Date) instanceof Date) {
				acc.push(key)
				return acc
			}
			if (typeof value === 'object' && value !== null) {
				acc.push(...getKeysOfNestedObject(value).map((nestedKey) => `${key}.${nestedKey}`))
				return acc
			}
			acc.push(key)
			return acc
		},
		[] as Array<string>,
	)
}

export default getKeysOfNestedObject
