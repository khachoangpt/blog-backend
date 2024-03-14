import { CustomerStatus } from '@/constants'
import getKeysOfNestedObject from '@/utils/get-keys-nested-object'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginAdminResponse:
 *       type: object
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/LoginAdminResponseCustomer'
 *         token:
 *           type: string
 *           description: Token of customer
 */
export type LoginAdminResponse = {
	customer: LoginAdminResponseCustomer
	token: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginAdminResponseCustomer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id of customer
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Created at of customer
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Updated at of customer
 *         first_name:
 *           type: string
 *           description: First name of customer
 *         middle_name:
 *           type: string
 *           description: Middle name of customer
 *         last_name:
 *           type: string
 *           description: Last name of customer
 *         email:
 *           type: string
 *           description: Email of customer
 *         status:
 *           $ref: '#/components/schemas/CustomerStatus'
 */
type LoginAdminResponseCustomer = {
	id: string
	created_at: string
	updated_at: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	status: CustomerStatus
}

const loginAdminResponseDummy: LoginAdminResponse = {
	customer: {
		id: '',
		created_at: '',
		updated_at: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		email: '',
		status: CustomerStatus.active,
	},
	token: '',
}

export const keysOfLoginAdminResponse = getKeysOfNestedObject(loginAdminResponseDummy)
