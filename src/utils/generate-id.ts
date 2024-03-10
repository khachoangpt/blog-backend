import { ulid } from 'ulid'

export const generateId = (prefix: string): string => {
	return `${prefix}_${ulid()}`
}
