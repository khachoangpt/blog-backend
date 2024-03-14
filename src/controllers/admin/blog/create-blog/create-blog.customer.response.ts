import getKeysOfNestedObject from '@/utils/get-keys-nested-object'

/**
 * @swagger
 *   components:
 *     schemas:
 *       CreateBlogResponse:
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
 *             description: Is published
 *           published_at:
 *             type: string
 *             description: Published at
 *           created_at:
 *             type: string
 *             description: Created at
 *           updated_at:
 *             type: string
 *             description: Updated at
 *           deleted_at:
 *             type: string
 *             description: Deleted at
 */
export type CreateBlogResponse = {
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

const createBlogResponseDummy: CreateBlogResponse = {
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

export const keysOfCreateBlogResponse = getKeysOfNestedObject(createBlogResponseDummy)
