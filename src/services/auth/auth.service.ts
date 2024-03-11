import { appConfig } from '@/configs/app-config'
import prisma from '@/configs/db'
import { CustomerStatus } from '@/constants'
import {
	type LoginResponse,
	keysOfLoginResponse,
} from '@/controllers/customer/auth/login/login.customer.response'
import type { LoginParams } from '@/controllers/customer/auth/login/login.customer.schema'
import {
	type RegisterResponse,
	keysOfRegisterResponse,
} from '@/controllers/customer/auth/register/register.customer.response'
import type { RegisterParams } from '@/controllers/customer/auth/register/register.customer.schema'
import { generateId } from '@/utils'
import { getData } from '@/utils/get-data'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
		// generate jwt token
		const token = jwt.sign(
			{ email: customerFind.email, customerId: customerFind.id },
			appConfig.jwt_secret,
		)
		return getData<LoginResponse>(
			{ customer: customerFind, token },
			keysOfLoginResponse,
		)
	}

	async register(registerParams: RegisterParams): Promise<RegisterResponse> {
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
		return getData<RegisterResponse>(customer, keysOfRegisterResponse)
	}
}
