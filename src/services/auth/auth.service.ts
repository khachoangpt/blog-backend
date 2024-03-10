import prisma from '@/configs/db'
import { CustomerStatus } from '@/constants'
import {
	type LoginResponse,
	keysOfLoginResponse,
} from '@/controllers/customer/auth/login/login.customer.response'
import type { LoginParams } from '@/controllers/customer/auth/login/login.customer.schema'
import {
	type RegisterDTO,
	keysOfRegisterDTO,
} from '@/controllers/customer/auth/register/register.customer.dto'
import type { RegisterParams } from '@/controllers/customer/auth/register/register.customer.schema'
import { generateId } from '@/utils'
import { getData } from '@/utils/get-data'
import bcrypt from 'bcrypt'

export default class AuthService {
	async login(loginParams: LoginParams): Promise<LoginResponse> {
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
		return getData<LoginResponse>(customerFind, keysOfLoginResponse)
	}

	async register(registerParams: RegisterParams): Promise<RegisterDTO> {
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
				id: generateId('customer'),
				password: passwordHash,
			},
		})
		return getData<RegisterDTO>(customer, keysOfRegisterDTO)
	}
}
