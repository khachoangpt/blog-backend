import prisma from '@/configs/db'
import type { CreateTagResponse } from '@/controllers/admin/tag/create-tag/create-tag.customer.response'
import type { CreateTagParams } from '@/controllers/admin/tag/create-tag/create-tag.customer.schema'
import type { GetTagListResponse } from '@/controllers/customer/tag/get-tag-list/get-tag-list.customer.response'
import { generateId } from '@/utils'
import type { Prisma } from '@prisma/client'

export default class TagService {
	async createTag(
		createTagParams: CreateTagParams,
	): Promise<CreateTagResponse> {
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
	): Promise<GetTagListResponse> {
		const tagsFind = await prisma.tag.findMany(config)
		return { tags: tagsFind, count: tagsFind.length }
	}
}
