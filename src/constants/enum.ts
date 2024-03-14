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
