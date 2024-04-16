import prisma from '@/configs/__mocks__/prisma'
import { ErrorMessages } from '@/constants'
import type { LoginAdminResponse } from '@/controllers/admin/auth/login'
import { type LoginResponse, keysOfLoginResponse } from '@/controllers/customer/auth/login'
import { type RegisterResponse, keysOfRegisterResponse } from '@/controllers/customer/auth/register'
import { getData } from '@/utils/get-data'
import { describe, expect, test, vi } from 'vitest'
import { customerMock } from '../__mocks__/customer.mock'
import AuthService from '../auth/auth.service'

vi.mock('@/configs/prisma.ts')

describe('AuthService', () => {
	describe('login', () => {
		test('login success', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(customerMock)
			const loginResponse = await authService.login({
				email: 'email@example.com',
				password: 'password',
			})
			expect(loginResponse.customer).toStrictEqual(
				getData<LoginResponse>({ customer: customerMock, token: '' }, keysOfLoginResponse).customer,
			)
		})
		test('customer not found', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(null)
			expect(
				async () => await authService.login({ email: 'email@example.com', password: 'password' }),
			).rejects.toThrowError(new Error(ErrorMessages.CUSTOMER_NOT_FOUND))
		})
		test('password is incorrect', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(customerMock)
			expect(
				async () =>
					await authService.login({ email: 'email@example.com', password: 'wrong_password' }),
			).rejects.toThrowError(new Error(ErrorMessages.EMAIL_OR_PASSWORD_INCORRECT))
		})
	})

	describe('loginAdmin', () => {
		test('login admin success', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(customerMock)
			const loginAdminResponse = await authService.loginAdmin({
				email: 'email@example.com',
				password: 'password',
			})
			expect(loginAdminResponse.customer).toStrictEqual(
				getData<LoginAdminResponse>({ customer: customerMock, token: '' }, keysOfLoginResponse)
					.customer,
			)
			expect(loginAdminResponse.token).toBeDefined()
		})
		test('customer not found', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(null)
			expect(
				async () => await authService.login({ email: 'email@example.com', password: 'password' }),
			).rejects.toThrowError(new Error(ErrorMessages.CUSTOMER_NOT_FOUND))
		})
		test('password is incorrect', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(customerMock)
			expect(
				async () =>
					await authService.login({ email: 'email@example.com', password: 'wrong_password' }),
			).rejects.toThrowError(new Error(ErrorMessages.EMAIL_OR_PASSWORD_INCORRECT))
		})
	})

	describe('register', () => {
		test('register success', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(null)
			prisma.customer.create.mockResolvedValue(customerMock)
			const registerResponse = await authService.register({
				email: 'email@example.com',
				password: 'password',
				first_name: 'first_name',
				last_name: 'last_name',
				middle_name: 'middle_name',
			})
			expect(registerResponse.customer).toStrictEqual(
				getData<RegisterResponse>({ customer: customerMock, token: '' }, keysOfRegisterResponse)
					.customer,
			)
		})
		test('customer already exist', async () => {
			const authService: AuthService = new AuthService()
			prisma.customer.findFirst.mockResolvedValue(customerMock)
			expect(
				async () =>
					await authService.register({
						email: 'email@example.com',
						password: 'password',
						first_name: 'first_name',
						last_name: 'last_name',
						middle_name: 'middle_name',
					}),
			).rejects.toThrowError(new Error('Customer is already exist'))
		})
	})
})
