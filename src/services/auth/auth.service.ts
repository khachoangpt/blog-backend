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
import { getData } from '@/utils/get-data'
import { type Customer, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { ulid } from 'ulid'

export default class AuthService {
	async login(loginParams: LoginParams): Promise<LoginDTO> {
		const prisma = new PrismaClient()
		const customerFind = await prisma.customer.findFirst({
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
		const prisma = new PrismaClient()
		const { email, password } = registerParams
		// check account exist
		const customerFind = await prisma.customer.findFirst({ where: { email } })
		if (customerFind) {
			throw new Error('Customer is already exist')
		}
		const passwordHash = await bcrypt.hash(password, 10)
		const customer = await prisma.customer.create({
			data: {
				...registerParams,
				id: `customer_${ulid()}`,
				password: passwordHash,
			},
		})
		return getData<Customer, RegisterDTO>(customer, keysOfRegisterDTO)
	}
}
