import type { Blog } from '@prisma/client'

export const blogMock: Blog = {
	id: '1',
	content: 'content',
	summary: 'summary',
	thumbnail: 'thumbnail',
	title: 'title',
	is_published: false,
	published_at: new Date(),
	created_at: new Date(),
	updated_at: new Date(),
	deleted_at: null,
}
