import { getData } from '@/utils/get-data'
import type { Customer } from '@prisma/client'
import type { Request, Response } from 'express'
import { keysOfGetMeAdminResponse } from './get-me.admin.response'

/**
 * @swagger
 * /admin/me:
 *   get:
 *     summary: Get current customer
 *     operationId: GetMe
 *     description: Get current customer
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Get current customer success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMeAdminResponse'
 */
export default async (req: Request, res: Response) => {
	const customer = req.customer
	res.status(200).json(getData<Customer>(customer, keysOfGetMeAdminResponse))
}
