import type AuthService from '@/services/auth/auth.service'
import { validator } from '@/utils'
import type { Request, Response } from 'express'
import { type RegisterParams, registerSchema } from './register.customer.schema'

/**
 * @swagger
 *   /customer/auth/register:
 *     post:
 *       summary: Register
 *       operationId: Register
 *       description: Register
 *       tags:
 *         - Auth
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterParams'
 *       responses:
 *         201:
 *           description: Register DTO
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/RegisterResponse'
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<RegisterParams>(registerSchema, req.body)
	const authService: AuthService = req.scope.resolve('authService')
	const registerRes = await authService.register(validated)
	res.status(201).json(registerRes)
}
