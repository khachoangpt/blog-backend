import prisma from '@/configs/__mocks__/prisma'
import CustomerService from '@/services/customer/customer.service'
import { describe, expect, test, vi } from 'vitest'
import { customerMock } from '../__mocks__/customer.mock'

vi.mock('@/configs/prisma.ts')

describe('CustomerService', () => {
	describe('retrieve', () => {
		test('customer id not include in parameters', async () => {
			const customerService: CustomerService = new CustomerService()
			expect(async () => await customerService.retrieve({})).rejects.toThrowError(
				new Error('Customer id is required'),
			)
		})
		test('retrieve customer not found', async () => {
			const customerService: CustomerService = new CustomerService()
			prisma.customer.findFirst.mockResolvedValue(null)
			expect(
				async () => await customerService.retrieve({ where: { id: '1' } }),
			).rejects.toThrowError(new Error('Customer not found.'))
		})
		test('retrieve customer success', async () => {
			prisma.customer.findFirst.mockResolvedValue(customerMock)
			const customerService: CustomerService = new CustomerService()
			const customer = await customerService.retrieve({
				where: { id: '1' },
			})
			expect(customer).toStrictEqual({ ...customerMock, id: '1' })
		})
	})
})
