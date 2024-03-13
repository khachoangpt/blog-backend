import z from 'zod'

export const loginAdminSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' }),
})

/**
 * @swagger
 *   components:
 *     schemas:
 *       LoginAdminParams:
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
export type LoginAdminParams = z.infer<typeof loginAdminSchema>
