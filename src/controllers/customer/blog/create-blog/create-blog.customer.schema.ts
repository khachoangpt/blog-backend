import z from 'zod'

export const createBlogSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title can not be empty'),
  summary: z.string().optional(),
  thumbnail: z.string().optional(),
  content: z.string().optional(),
})

export type CreateBlogParams = z.infer<typeof createBlogSchema>

/**
 * @swagger
 *   components:
 *     schemas:
 *       CreateBlogParams:
 *         type: object
 *         required:
 *           - title
 *         properties:
 *           title:
 *             type: string
 *             description: Title of blog
 *           summary:
 *             type: string
 *             description: Summary of blog
 *           thumbnail:
 *             type: string
 *             description: Thumbnail of blog
 *           content:
 *             type: string
 *             description: Content of blog
 */
