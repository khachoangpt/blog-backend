import { asyncHandler } from '@/utils'
import type { Customer } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'
import passport from 'passport'

export const authenticateCustomer = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		passport.authenticate(
			'jwt',
			{ session: false },
			(err: Error, customerData: { data: Customer }) => {
				if (err) {
					return next(err)
				}
				if (!customerData) {
					throw new Error('Customer not found')
				}
				req.customer = customerData.data
				return next()
			},
		)(req, res, next)
	},
)
