import dataSource from '@/configs/ormconfig'
import { Customer } from '@/models/customer/customer.model'

export const CustomerRepository = dataSource.getRepository(Customer)

export default () => CustomerRepository
