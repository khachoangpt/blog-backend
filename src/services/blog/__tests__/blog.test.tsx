import prisma from '@/configs/__mocks__/prisma'
import TagService from '@/services/tag/tag.service'
import { describe, expect, test, vi } from 'vitest'
import { blogMock } from '../__mocks__/blog.mock'
import BlogService from '../blog.service'

vi.mock('@/configs/prisma.ts')

describe('BlogService', () => {
	describe('createBlog', () => {
		test('create blog success', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.create.mockResolvedValue(blogMock)
			const blog = await blogService.createBlog({
				title: 'title',
				content: 'content',
				summary: 'summary',
				thumbnail: 'thumbnail',
			})
			expect(blog).toStrictEqual({ ...blogMock, id: '1' })
		})
	})

	describe('updateBlog', () => {
		test('update blog success', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue(blogMock)
			prisma.blog.update.mockResolvedValue({ ...blogMock, content: 'content updated' })
			const blog = await blogService.updateBlog({
				title: 'title',
				content: 'content updated',
				summary: 'summary',
				thumbnail: 'thumbnail',
				id: '1',
			})
			expect(blog).toStrictEqual({ ...blogMock, id: '1', content: 'content updated' })
		})
		test('update blog not found', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue(null)
			expect(
				async () =>
					await blogService.updateBlog({
						title: 'title',
						content: 'content updated',
						summary: 'summary',
						thumbnail: 'thumbnail',
						id: '1',
					}),
			).rejects.toThrowError(new Error('Blog not found'))
		})
	})
})
