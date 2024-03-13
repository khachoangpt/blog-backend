const getKeysOfNestedObject = (obj: object): Array<string> => {
	return Object.keys(obj).reduce(
		(acc, key) => {
			const value = obj[key as keyof typeof obj]
			if (typeof value === 'object' && value !== null) {
				return [...acc, ...getKeysOfNestedObject(value).map((nestedKey) => `${key}.${nestedKey}`)]
			}
			return [...acc, key]
		},
		[] as Array<string>,
	)
}

export default getKeysOfNestedObject
