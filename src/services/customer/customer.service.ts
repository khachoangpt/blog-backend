import { Errors } from '@/base/errors'
import prisma from '@/configs/prisma'
import type { Customer, Prisma } from '@prisma/client'

export default class CustomerService {
	/**
	 * Retrieves a customer from the database based on the provided options.
	 *
	 * @param {Prisma.CustomerFindFirstArgs} options - The options used to query the database for the customer.
	 * @return {Promise<Customer>} The retrieved customer.
	 */
	async retrieve(options: Prisma.CustomerFindFirstArgs): Promise<Customer> {
		const customerId = options.where?.id
		if (!customerId) throw new Errors.NotFound('Customer id is required')
		const customer = await prisma.customer.findFirst(options)
		if (!customer) {
			throw new Errors.NotFound('Customer not found.')
		}
		return customer
	}
}
