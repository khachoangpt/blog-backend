import AuthService from '@/services/auth/auth.service'
import { validator } from '@/utils'
import { Request, Response } from 'express'
import { LoginParams, loginSchema } from './login.customer.schema'

/**
 * @swagger
 *   /customer/auth/login:
 *     post:
 *       summary: Login
 *       operationId: Login
 *       description: Login
 *       tags:
 *         - Auth
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginParams'
 *       responses:
 *         201:
 *           description: Login DTO
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginDTO'
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<LoginParams>(loginSchema, req.body)
	const authService: AuthService = req.scope.resolve('authService')
	const loginRes = await authService.login(validated)
	res.status(200).json(loginRes)
}
