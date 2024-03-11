import { getData } from '@/utils/get-data'
import type { Customer } from '@prisma/client'
import type { Request, Response } from 'express'
import { keysOfGetMeResponse } from './get-me.customer.response'

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get current customer
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Get current customer success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMeResponse'
 */
export default async (req: Request, res: Response) => {
	const customer = req.customer
	res.status(200).json(getData<Customer>(customer, keysOfGetMeResponse))
}
