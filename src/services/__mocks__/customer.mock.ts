import { CustomerRole, CustomerStatus } from '@/constants'
import type { Customer } from '@prisma/client'

export const customerMock: Customer = {
	id: '1',
	first_name: 'first_name',
	middle_name: 'middle_name',
	last_name: 'last_name',
	email: 'email@example.com',
	password: '$2a$10$IfiSIbaEY5Y5PyDBiuDaOu9lQI9S32Jeq.OsA5oyrCUJytz/tKnGi',
	status: CustomerStatus.active,
	created_at: new Date(),
	updated_at: new Date(),
	deleted_at: null,
	role: CustomerRole.customer,
}
