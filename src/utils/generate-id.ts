import { ulid } from 'ulid'

/**
 * Generate a composed id based on the input parameters and return either the is if it exists or the generated one.
 * @param idProperty
 * @param prefix
 */
export const generateId = (idProperty?: string, prefix?: string): string => {
	if (idProperty) {
		return idProperty
	}

	const id = ulid()
	const newPrefix = prefix ? `${prefix}_` : ''
	return `${newPrefix}${id}`
}
