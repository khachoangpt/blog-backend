import type { Customer } from '@prisma/client'
import { expect, test, vi } from 'vitest'
import prisma from '../../configs/__mocks__/prisma'
import { CustomerRole, CustomerStatus } from '../../constants'
import CustomerService from './customer.service'

vi.mock('../../configs/prisma.ts')

test('retrieve customer', async () => {
	const customerMock: Customer = {
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
	prisma.customer.findFirst.mockResolvedValue(customerMock)
	const customerService: CustomerService = new CustomerService()
	const customer = await customerService.retrieve({
		where: { id: '1', email: 'email@example.com' },
	})
	expect(customer).toStrictEqual({ ...customerMock, id: '1', email: 'email@example.com' })
})

test('retrieve customer not found', async () => {
	const customerService: CustomerService = new CustomerService()
	prisma.customer.findFirst.mockImplementation(() => {
		throw new Error('Customer not found.')
	})
	expect(async () => await customerService.retrieve({ where: { id: '1' } })).rejects.toThrowError(
		'Customer not found.',
	)
})
