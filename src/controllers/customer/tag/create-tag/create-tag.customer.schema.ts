import z from 'zod'

export const createTagSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
})

/**
 * @swagger
 *   components:
 *     schemas:
 *       CreateTagParams:
 *         type: object
 *         required:
 *           - name
 *         properties:
 *           name:
 *             type: string
 *             description: Name of tag
 */
export type CreateTagParams = z.infer<typeof createTagSchema>
