import { CustomerStatus } from '@/constants'
import {
	type LoginDTO,
	keysOfLoginDTO,
} from '@/controllers/customer/auth/login/login.customer.dto'
import type { LoginParams } from '@/controllers/customer/auth/login/login.customer.schema'
import {
	type RegisterDTO,
	keysOfRegisterDTO,
} from '@/controllers/customer/auth/register/register.customer.dto'
import type { RegisterParams } from '@/controllers/customer/auth/register/register.customer.schema'
import type { Customer } from '@/models/customer/customer.model'
import type { CustomerRepository } from '@/repositories/customer.repository'
import { getData } from '@/utils/get-data'
import bcrypt from 'bcrypt'

type InjectableDependencies = {
	customerRepository: typeof CustomerRepository
}

export default class AuthService {
	protected readonly _customerRepository: typeof CustomerRepository

	constructor({ customerRepository }: InjectableDependencies) {
		this._customerRepository = customerRepository
	}

	async login(loginParams: LoginParams): Promise<LoginDTO> {
		const customerFind = await this._customerRepository.findOne({
			where: { email: loginParams.email },
		})
		if (!customerFind || customerFind.status !== CustomerStatus.ACTIVE) {
			throw new Error('Customer not found.')
		}
		const isPasswordValid = await bcrypt.compare(
			loginParams.password,
			customerFind.password,
		)
		if (!isPasswordValid) {
			throw new Error('Email or password incorrect.')
		}

		return getData<Customer, LoginDTO>(customerFind, keysOfLoginDTO)
	}

	async register(registerParams: RegisterParams): Promise<RegisterDTO> {
		const { email, password } = registerParams
		// check account exist
		const customerFind = await this._customerRepository.findOne({
			where: { email },
		})
		if (customerFind) {
			throw new Error('Customer is already exist')
		}
		const passwordHash = await bcrypt.hash(password, 10)
		const customerCreated = this._customerRepository.create({
			...registerParams,
			password: passwordHash,
		})
		const customer = await this._customerRepository.save(customerCreated)
		return getData<Customer, RegisterDTO>(customer, keysOfRegisterDTO)
	}
}
