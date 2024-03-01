import { CustomerStatus } from '@/constants'

/**
 * @swagger
 *   components:
 *     schemas:
 *       RegisterDTO:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Id of customer
 *           created_at:
 *             type: string
 *             description: Date of customer created
 *           updated_at:
 *             type: string
 *             description: Date of customer updated
 *           first_name:
 *             type: string
 *             description: First name of customer
 *           middle_name:
 *             type: string
 *             description: Middle name of customer
 *           last_name:
 *             type: string
 *             description: Last name of customer
 *           email:
 *             type: string
 *             description: Email of customer
 *           status:
 *             $ref: '#/components/schemas/CustomerStatus'
 */
export type RegisterDTO = {
	id: string
	created_at: string
	updated_at: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	status: CustomerStatus
}

const registerDTODummy: RegisterDTO = {
	created_at: '',
	email: '',
	first_name: '',
	id: '',
	last_name: '',
	middle_name: '',
	status: CustomerStatus.ACTIVE,
	updated_at: '',
}

export const keysOfRegisterDTO = Object.keys(
	registerDTODummy,
) as (keyof RegisterDTO)[]
