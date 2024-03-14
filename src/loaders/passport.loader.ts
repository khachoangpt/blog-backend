import { appConfig } from '@/configs/app-config'
import type CustomerService from '@/services/customer/customer.service'
import { CustomerRole } from '@prisma/client'
import type { AwilixContainer } from 'awilix'
import type { Express } from 'express'
import passport from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

export default async ({ app, container }: { app: Express; container: AwilixContainer }) => {
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
					.retrieve({ where: { id: customerId, role: CustomerRole.customer } })
					.then((customer) => {
						jwtPayload.data = customer
						return done(null, jwtPayload)
					})
					.catch(() => {
						return done(null, false)
					})
			},
		),
	)

	passport.use(
		'jwt-admin',
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
					.retrieve({ where: { id: customerId, role: CustomerRole.admin } })
					.then((customer) => {
						jwtPayload.data = customer
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
