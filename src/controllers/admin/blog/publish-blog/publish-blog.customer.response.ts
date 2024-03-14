import getKeysOfNestedObject from '@/utils/get-keys-nested-object'

/**
 * @swagger
 * components:
 *   schemas:
 *     PublishBlogResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id of blog
 *         title:
 *           type: string
 *           description: Title of blog
 *         summary:
 *           type: string
 *           description: Summary of blog
 *         thumbnail:
 *           type: string
 *           description: Thumbnail of blog
 *         content:
 *           type: string
 *           description: Content of blog
 *         is_published:
 *           type: boolean
 *           description: Is blog published
 *         published_at:
 *           type: string
 *           format: date-time
 *           description: Published at of blog
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Created at of blog
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Updated at of blog
 */
export type PublishBlogResponse = {
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

const publishBlogResponse: PublishBlogResponse = {
	id: '',
	title: '',
	summary: '',
	thumbnail: '',
	content: '',
	is_published: false,
	published_at: null,
	created_at: new Date(),
	updated_at: new Date(),
	deleted_at: null,
}

export const keysOfPublishBlogResponse = getKeysOfNestedObject(publishBlogResponse)
