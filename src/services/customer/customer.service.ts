import prisma from '@/configs/db'

export default class CustomerService {
	async retrieve(id: string) {
		if (!id) throw new Error('Customer id is required')
		const customer = await prisma.customer.findFirst({ where: { id } })
		if (!customer) {
			throw new Error('Customer not found')
		}
		return customer
	}
}
