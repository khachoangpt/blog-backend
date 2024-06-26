import { Errors } from '@/base/errors'
import { appConfig } from '@/configs/app-config'
import prisma from '@/configs/prisma'
import { CustomerRole, CustomerStatus, ErrorMessages } from '@/constants'
import {
	type LoginAdminParams,
	type LoginAdminResponse,
	keysOfLoginAdminResponse,
} from '@/controllers/admin/auth/login'
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
			where: {
				email: loginParams.email,
				status: CustomerStatus.active,
				role: CustomerRole.customer,
			},
		})
		if (!existingCustomer) {
			throw new Errors.NotFound(ErrorMessages.CUSTOMER_NOT_FOUND)
		}
		const isPasswordValid = await bcrypt.compare(loginParams.password, existingCustomer.password)
		if (!isPasswordValid) {
			throw new Errors.UnAuthorized(ErrorMessages.EMAIL_OR_PASSWORD_INCORRECT)
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
	 * Login admin with email and password
	 *
	 * @param {LoginAdminParams} loginParams - login admin parameters
	 * @return {Promise<LoginAdminResponse>} login admin response
	 */
	async loginAdmin(loginParams: LoginAdminParams): Promise<LoginAdminResponse> {
		const existingCustomer = await prisma.customer.findFirst({
			where: { email: loginParams.email, role: CustomerRole.admin, status: CustomerStatus.active },
		})
		if (!existingCustomer) {
			throw new Errors.NotFound(ErrorMessages.CUSTOMER_NOT_FOUND)
		}
		const isPasswordValid = await bcrypt.compare(loginParams.password, existingCustomer.password)
		if (!isPasswordValid) {
			throw new Errors.UnAuthorized(ErrorMessages.EMAIL_OR_PASSWORD_INCORRECT)
		}
		// generate jwt token
		const token = jwt.sign(
			{ email: existingCustomer.email, customerId: existingCustomer.id },
			appConfig.jwt_secret,
			{
				expiresIn: '30days',
			},
		)
		return getData<LoginAdminResponse>(
			{ customer: existingCustomer, token },
			keysOfLoginAdminResponse,
		)
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
			throw new Errors.Conflict('Customer is already exist')
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
