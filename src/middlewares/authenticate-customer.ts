import type { Customer } from '@prisma/client'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import passport from 'passport'

export default (): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		passport.authenticate(
			'jwt',
			{ session: false },
			(err: Error, customer: Customer) => {
				if (err) {
					return next(err)
				}
				if (!customer) {
					throw new Error('Customer not found')
				}
				req.customer = customer
				return next()
			},
		)(req, res, next)
	}
}
