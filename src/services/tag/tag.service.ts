import prisma from '@/configs/db'
import type { CreateTagParams } from '@/controllers/customer/tag/create-tag/create-tag.customer.schema'
import { generateId } from '@/utils'
import type { Prisma, Tag } from '@prisma/client'

export default class TagService {
	async createTag(createTagParams: CreateTagParams) {
		const tagFind = await prisma.tag.findFirst({
			where: { name: { equals: createTagParams.name } },
		})
		if (tagFind) {
			throw new Error('Tag is already exist')
		}
		const tag = await prisma.tag.create({
			data: { name: createTagParams.name, id: generateId('tag') },
		})
		return tag
	}

	async getTagList(
		config: Prisma.TagFindManyArgs,
	): Promise<{ tags: Tag[]; count: number }> {
		const tagsFind = await prisma.tag.findMany(config)
		return { tags: tagsFind, count: tagsFind.length }
	}
}
