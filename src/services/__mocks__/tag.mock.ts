import type { Tag } from '@prisma/client'

export const tagMock: Tag = {
	id: '1',
	name: 'tag',
	created_at: new Date(),
	updated_at: new Date(),
	deleted_at: null,
}
