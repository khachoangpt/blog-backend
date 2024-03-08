import type { CreateTagParams } from '@/controllers/customer/tag/create-tag/create-tag.customer.schema'
import { type Prisma, PrismaClient, type Tag } from '@prisma/client'
import { ulid } from 'ulid'

export default class TagService {
	async createTag(createTagParams: CreateTagParams) {
		const prisma = new PrismaClient()
		const tagFind = await prisma.tag.findFirst({
			where: { name: { equals: createTagParams.name } },
		})
		if (tagFind) {
			throw new Error('Tag is already exist')
		}
		const tag = await prisma.tag.create({
			data: { name: createTagParams.name, id: `tag_${ulid()}` },
		})
		return tag
	}

	async getTagList(
		config: Prisma.TagFindManyArgs,
	): Promise<{ tags: Tag[]; count: number }> {
		const prisma = new PrismaClient()
		const tagsFind = await prisma.tag.findMany(config)
		return { tags: tagsFind, count: tagsFind.length }
	}
}
