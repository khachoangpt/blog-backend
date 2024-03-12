import z from 'zod'

export const updateBlogSchema = z.object({
	id: z
		.string({ required_error: 'Title is required' })
		.trim()
		.min(1, 'Title can not be empty'),
	title: z
		.string({ required_error: 'Title is required' })
		.trim()
		.min(1, 'Title can not be empty'),
	summary: z.string().optional(),
	thumbnail: z.string().optional(),
	content: z.string().optional(),
})

export type UpdateBlogParams = z.infer<typeof updateBlogSchema>

/**
 * @swagger
 *   components:
 *     schemas:
 *       UpdateBlogParams:
 *         type: object
 *         required:
 *           - id
 *           - title
 *         properties:
 *           id:
 *             type: string
 *             description: Id of blog
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
