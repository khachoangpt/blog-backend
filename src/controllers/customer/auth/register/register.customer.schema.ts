import z from 'zod'

export const registerSchema = z.object({
  first_name: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  middle_name: z
    .string({ required_error: 'Middle name is required' })
    .min(1, 'Middle name is required'),
  last_name: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
})

/**
 * @swagger
 *   components:
 *     schemas:
 *       RegisterParams:
 *         type: object
 *         required:
 *           - first_name
 *           - last_name
 *           - email
 *           - password
 *         properties:
 *           first_name:
 *             type: string
 *             description: First name of customer
 *           middle_name:
 *             type: string
 *             description: Middle name of customer
 *           last_name:
 *             type: string
 *             description: Last name of customer
 *           email:
 *             type: string
 *             description: Email of customer
 *           password:
 *             type: string
 *             description: Password of customer
 */
export type RegisterParams = z.infer<typeof registerSchema>
