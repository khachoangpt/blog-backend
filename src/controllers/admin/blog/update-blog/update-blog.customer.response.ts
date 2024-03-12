/**
 * @swagger
 *   components:
 *     schemas:
 *       UpdateBlogResponse:
 *         type: object
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
 *           is_published:
 *             type: boolean
 *             description: True if blog is published
 *           published_at:
 *             type: string
 *             format: date-time
 *             description: Date when blog is published
 *           created_at:
 *             type: string
 *             format: date-time
 *             description: Date when blog is created
 *           updated_at:
 *             type: string
 *             format: date-time
 *             description: Date when blog is updated
 *           deleted_at:
 *             type: string
 *             format: date-time
 *             description: Date when blog is deleted
 */
export type UpdateBlogResponse = {
	id: string
	title: string
	summary: string
	thumbnail: string
	content: string
	is_published: boolean
	published_at: Date | null
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

const updateBlogResponseDummy: UpdateBlogResponse = {
	id: 'update-blog-id',
	title: 'update-blog-title',
	summary: 'update-blog-summary',
	thumbnail: 'update-blog-thumbnail',
	content: 'update-blog-content',
	is_published: false,
	published_at: null,
	created_at: new Date('2022-02-10'),
	updated_at: new Date('2022-02-11'),
	deleted_at: null,
}

export const keysOfUpdateBlogResponse = Object.keys(
	updateBlogResponseDummy,
) as Array<keyof UpdateBlogResponse>
