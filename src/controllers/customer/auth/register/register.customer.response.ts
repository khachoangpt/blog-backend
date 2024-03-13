import { CustomerStatus } from '@/constants'

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/RegisterResponseCustomer'
 *         token:
 *           type: string
 *           description: JWT token
 */
export type RegisterResponse = {
	customer: RegisterResponseCustomer
	token: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterResponseCustomer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: customer id
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         first_name:
 *           type: string
 *         middle_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         status:
 *           $ref: '#/components/schemas/CustomerStatus'
 */
type RegisterResponseCustomer = {
	id: string
	created_at: string
	updated_at: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	status: CustomerStatus
}

const registerResponseDummy: RegisterResponse = {
	customer: {
		created_at: '',
		email: '',
		first_name: '',
		id: '',
		last_name: '',
		middle_name: '',
		status: CustomerStatus.ACTIVE,
		updated_at: '',
	},
	token: '',
}

export const keysOfRegisterResponse = Object.keys(registerResponseDummy) as Array<
	keyof RegisterResponse
>
