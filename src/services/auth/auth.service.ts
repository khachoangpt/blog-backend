import { appConfig } from '@/configs/app-config'
import prisma from '@/configs/db'
import { CustomerStatus } from '@/constants'
import {
	type LoginParams,
	type LoginResponse,
	keysOfLoginResponse,
} from '@/controllers/customer/auth/login'
import {
	type RegisterParams,
	type RegisterResponse,
	keysOfRegisterResponse,
} from '@/controllers/customer/auth/register'
import { generateId } from '@/utils'
import { getData } from '@/utils/get-data'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthService {
	/**
	 * Login with email and password
	 *
	 * @param {LoginParams} loginParams - login parameters
	 * @return {Promise<LoginResponse>} login response
	 */
	async login(loginParams: LoginParams): Promise<LoginResponse> {
		const existingCustomer = await prisma.customer.findFirst({
			where: { email: loginParams.email },
		})
		if (!existingCustomer || existingCustomer.status !== CustomerStatus.ACTIVE) {
			throw new Error('Customer not found.')
		}
		const isPasswordValid = await bcrypt.compare(loginParams.password, existingCustomer.password)
		if (!isPasswordValid) {
			throw new Error('Email or password incorrect.')
		}
		// generate jwt token
		const token = jwt.sign(
			{ email: existingCustomer.email, customerId: existingCustomer.id },
			appConfig.jwt_secret,
			{
				expiresIn: '30days',
			},
		)
		return getData<LoginResponse>({ customer: existingCustomer, token }, keysOfLoginResponse)
	}

	/**
	 * Register
	 *
	 * @param {RegisterParams} registerParams - register parameters
	 * @return {Promise<RegisterResponse>} register response
	 */
	async register(registerParams: RegisterParams): Promise<RegisterResponse> {
		const { email, password } = registerParams
		// check account exist
		const existingCustomer = await prisma.customer.findFirst({
			where: { email },
		})
		if (existingCustomer) {
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
		// generate jwt token
		const token = jwt.sign(
			{ email: customer.email, customerId: customer.id },
			appConfig.jwt_secret,
			{
				expiresIn: '30days',
			},
		)
		return getData<RegisterResponse>({ customer, token }, keysOfRegisterResponse)
	}
}
