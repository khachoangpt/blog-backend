import prisma from '@/configs/__mocks__/prisma'
import { describe, expect, test, vi } from 'vitest'
import { tagMock } from '../__mocks__/tag.mock'
import TagService from '../tag/tag.service'

vi.mock('@/configs/prisma.ts')

describe('TagService', () => {
	describe('createTag', () => {
		test('create tag success', async () => {
			const tagService: TagService = new TagService()
			prisma.tag.create.mockResolvedValue(tagMock)
			const tag = await tagService.createTag({ name: 'tag' })
			expect(tag).toStrictEqual(tagMock)
		})
		test('create tag already exist', async () => {
			const tagService: TagService = new TagService()
			prisma.tag.findFirst.mockResolvedValue(tagMock)
			expect(async () => await tagService.createTag({ name: 'tag' })).rejects.toThrowError(
				new Error('Tag is already exist'),
			)
		})
	})

	describe('getListTag', () => {
		test('get list tag success', async () => {
			const tagService: TagService = new TagService()
			prisma.tag.findMany.mockResolvedValue([tagMock])
			const { tags, total } = await tagService.getTagList({ skip: 0, take: 10 })
			expect(tags).toStrictEqual([tagMock])
			expect(total).toBe(1)
		})
	})
})
