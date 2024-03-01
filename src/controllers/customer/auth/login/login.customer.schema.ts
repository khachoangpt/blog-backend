import z from 'zod'

export const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' }),
})

/**
 * @swagger
 *   components:
 *     schemas:
 *       LoginParams:
 *         type: object
 *         required:
 *           - email
 *           - password
 *         properties:
 *           email:
 *             type: string
 *             description: Email of customer
 *           password:
 *             type: string
 *             description: Password of customer
 */
export type LoginParams = z.infer<typeof loginSchema>
