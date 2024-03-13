import { CustomerStatus } from '@/constants'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/LoginResponseCustomer'
 *         token:
 *           type: string
 *           description: Token of customer
 */
export type LoginResponse = {
	customer: LoginResponseCustomer
	token: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponseCustomer:
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
type LoginResponseCustomer = {
	id: string
	created_at: string
	updated_at: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	status: CustomerStatus
}

const loginResponseDummy: LoginResponse = {
	customer: {
		id: '',
		created_at: '',
		updated_at: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		email: '',
		status: CustomerStatus.ACTIVE,
	},
	token: '',
}

export const keysOfLoginResponse = Object.keys(loginResponseDummy) as Array<keyof LoginResponse>
