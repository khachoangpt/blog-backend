export enum NodeEnvEnum {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       CustomerStatus:
 *         type: string
 *         enum:
 *           - ACTIVE
 *           - BANNED
 *           - DELETED
 */
export enum CustomerStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  DELETED = 'deleted',
}
