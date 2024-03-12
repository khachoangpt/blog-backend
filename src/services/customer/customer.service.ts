import prisma from '@/configs/db'
import type { Prisma } from '@prisma/client'

export default class CustomerService {
	async retrieve(options: Prisma.CustomerFindFirstArgs) {
		const customerId = options.where?.id
		if (!customerId) throw new Error('Customer id is required')
		const customer = await prisma.customer.findFirst(options)
		if (!customer) {
			throw new Error('Customer not found')
		}
		return customer
	}
}
