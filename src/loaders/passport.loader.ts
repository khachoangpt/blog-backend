import { appConfig } from '@/configs/app-config'
import type CustomerService from '@/services/customer/customer.service'
import type { AwilixContainer } from 'awilix'
import type { Express } from 'express'
import passport from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

export default async ({
	app,
	container,
}: { app: Express; container: AwilixContainer }) => {
	const customerService: CustomerService = container.resolve('customerService')

	passport.use(
		'jwt',
		new JWTStrategy(
			{
				jwtFromRequest: (req) => {
					return ExtractJwt.fromAuthHeaderAsBearerToken()(req)
				},
				secretOrKey: appConfig.jwt_secret,
			},
			async (jwtPayload, done) => {
				const customerId = jwtPayload.customerId
				customerService
					.retrieve(customerId)
					.then((user) => {
						jwtPayload.data = user
						return done(null, jwtPayload)
					})
					.catch(() => {
						return done(null, false)
					})
			},
		),
	)
	app.use(passport.initialize())
}
