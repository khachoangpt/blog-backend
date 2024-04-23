export enum NodeEnvEnum {
	development = 'development',
	production = 'production',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       CustomerStatus:
 *         type: string
 *         enum:
 *           - active
 *           - banned
 *           - deleted
 */
export enum CustomerStatus {
	active = 'active',
	banned = 'banned',
	deleted = 'deleted',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       CustomerRole:
 *         type: string
 *         enum:
 *           - customer
 *           - admin
 */
export enum CustomerRole {
	customer = 'customer',
	admin = 'admin',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       ErrorMessages:
 *         type: string
 *         enum:
 *           - Customer not found
 *           - Email or password incorrect
 */
export enum ErrorMessages {
	CUSTOMER_NOT_FOUND = 'Customer not found',
	EMAIL_OR_PASSWORD_INCORRECT = 'Email or password incorrect',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       CacheType:
 *         type: string
 *         enum:
 *           - default
 *           - force-cache
 *           - no-cache
 *           - no-store
 *           - only-if-cached
 *           - reload
 *         description: Cache type
 */

/**
 * @swagger
 *   components:
 *     schemas:
 *       NextJsOptions:
 *         type: object
 *         properties:
 *           revalidate:
 *             type: number
 *             description: Revalidate time in seconds
 *           type:
 *             $ref: '#/components/schemas/CacheType'
 *           tags:
 *             type: array
 *             items:
 *               type: string
 *             description: Cache tags
 */
