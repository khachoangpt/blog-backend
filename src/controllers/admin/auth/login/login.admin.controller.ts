import type AuthService from '@/services/auth/auth.service'
import { validator } from '@/utils'
import type { Request, Response } from 'express'
import { type LoginAdminParams, loginAdminSchema } from './login.admin.schema'

/**
 * @swagger
 *   /admin/auth/login:
 *     post:
 *       summary: Login admin
 *       operationId: Login
 *       description: Login admin
 *       tags:
 *         - Auth
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginAdminParams'
 *       responses:
 *         201:
 *           description: Login admin response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginAdminResponse'
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<LoginAdminParams>(loginAdminSchema, req.body)
	const authService: AuthService = req.scope.resolve('authService')
	const loginRes = await authService.loginAdmin(validated)
	res.status(200).json(loginRes)
}
