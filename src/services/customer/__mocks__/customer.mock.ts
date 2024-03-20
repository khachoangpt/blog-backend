import { CustomerRole, CustomerStatus } from '@/constants'
import type { Customer } from '@prisma/client'

export const customerMock: Customer = {
	id: '1',
	first_name: 'first_name',
	middle_name: null,
	last_name: 'last_name',
	email: 'email@example.com',
	password: 'password',
	status: CustomerStatus.active,
	created_at: new Date(),
	updated_at: new Date(),
	deleted_at: null,
	role: CustomerRole.customer,
}
