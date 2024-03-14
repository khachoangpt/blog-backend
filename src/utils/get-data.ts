import { pick } from 'lodash'

/**
 * Returns a subset of properties from an object, with the types of the returned object
 * matching the types of the requested properties.
 *
 * @param object The object to retrieve data from.
 * @param select The properties to retrieve from the object.
 * @returns An object containing the requested properties, with their types matching
 * the types of the properties in the `select` argument.
 */
export const getData = <K extends Record<keyof K, unknown>>(
	object: Record<keyof K, unknown>,
	select: string[],
): K => {
	return pick(object, select) as K
}

/**
 * Returns a subset of properties from an object, with the types of the returned object
 * matching the types of the requested properties.
 *
 * @param object The object to retrieve data from.
 * @param select The properties to retrieve from the object.
 *
 * @returns An object containing the requested properties, with their types matching
 * the types of the properties in the `select` argument.
 */
export const getDataArray = <K extends Record<keyof K, unknown>>(
	object: Record<keyof K, unknown>[],
	select: string[],
): K[] => {
	return object.map((obj) => getData(obj, select))
}
