import { CustomerStatus } from '@/constants'
import getKeysOfNestedObject from '@/utils/get-keys-nested-object'

/**
 * @swagger
 * components:
 *   schemas:
 *     GetMeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the customer
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date time of customer creation
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date time of customer update
 *         first_name:
 *           type: string
 *           description: The first name of customer
 *         middle_name:
 *           type: string
 *           description: The middle name of customer
 *         last_name:
 *           type: string
 *           description: The last name of customer
 *         email:
 *           type: string
 *           description: The email of customer
 *         status:
 *           $ref: '#/components/schemas/CustomerStatus'
 *           description: The status of the customer
 */
export type GetMeResponse = {
	id: string
	created_at: string
	updated_at: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	status: CustomerStatus
}

const getMeResponseDummy: GetMeResponse = {
	id: '',
	created_at: '',
	updated_at: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	email: '',
	status: CustomerStatus.active,
}

export const keysOfGetMeResponse = getKeysOfNestedObject(getMeResponseDummy)
