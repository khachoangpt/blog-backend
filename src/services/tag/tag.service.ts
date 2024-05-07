import { Errors } from '@/base/errors'
import prisma from '@/configs/prisma'
import type { CreateTagParams, CreateTagResponse } from '@/controllers/admin/tag/create-tag'
import type { GetTagListResponse } from '@/controllers/customer/tag/get-tag-list'
import { generateId } from '@/utils'
import type { Prisma } from '@prisma/client'

export default class TagService {
	/**
	 * A function to create a new tag.
	 *
	 * @param {CreateTagParams} createTagParams - parameters for creating the tag
	 * @return {Promise<CreateTagResponse>} the newly created tag
	 */
	async createTag(createTagParams: CreateTagParams): Promise<CreateTagResponse> {
		const existingTag = await prisma.tag.findFirst({
			where: { name: { equals: createTagParams.name } },
			select: { id: true },
		})
		if (existingTag) {
			throw new Errors.Conflict('Tag is already exist')
		}
		const tag = await prisma.tag.create({
			data: { name: createTagParams.name, id: generateId('tag') },
		})
		return tag
	}

	/**
	 * Retrieves a list of tags based on the provided configuration.
	 *
	 * @param {Prisma.TagFindManyArgs} config - The configuration for finding tags.
	 * @return {Promise<GetTagListResponse>} An object containing the list of tags and the total of tags found.
	 */
	async getTagList(config: Prisma.TagFindManyArgs): Promise<GetTagListResponse> {
		const tagsFind = await prisma.tag.findMany(config)
		return { tags: tagsFind, total: tagsFind.length }
	}
}
