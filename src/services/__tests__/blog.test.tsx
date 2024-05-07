import prisma from '@/configs/__mocks__/prisma'
import { ErrorMessages } from '@/constants'
import TagService from '@/services/tag/tag.service'
import { describe, expect, test, vi } from 'vitest'
import { blogMock } from '../__mocks__/blog.mock'
import BlogService from '../blog/blog.service'

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
			).rejects.toThrowError(new Error(ErrorMessages.BLOG_NOT_FOUND))
		})
	})

	describe('publishBlog', () => {
		test('publish blog success', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue({ ...blogMock, is_published: false })
			prisma.blog.update.mockResolvedValue({ ...blogMock, is_published: true })
			const blog = await blogService.publishBlog('1')
			expect(blog).toStrictEqual({ ...blogMock, id: '1', is_published: true })
		})
		test('publish blog not found', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue(null)
			expect(async () => await blogService.publishBlog('1')).rejects.toThrowError(
				new Error(ErrorMessages.BLOG_NOT_FOUND),
			)
		})
		test('publish blog already published', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue({ ...blogMock, is_published: true })
			expect(async () => await blogService.publishBlog('1')).rejects.toThrowError(
				new Error('Blog is already published.'),
			)
		})
	})

	describe('getListBlog', () => {
		test('get list blog success', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findMany.mockResolvedValue([blogMock])
			const { blogs, total } = await blogService.getListBlog({ skip: 0, take: 10 })
			expect(blogs).toStrictEqual([blogMock])
			expect(total).toBe(1)
		})
	})

	describe('getBlogDetail', () => {
		test('get blog detail success', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue(blogMock)
			const blog = await blogService.getBlogDetail('1')
			expect(blog).toStrictEqual(blogMock)
		})
		test('get blog detail not found', async () => {
			const tagService: TagService = new TagService()
			const blogService: BlogService = new BlogService({ tagService })
			prisma.blog.findFirst.mockResolvedValue(null)
			expect(async () => await blogService.getBlogDetail('1')).rejects.toThrowError(
				new Error(ErrorMessages.BLOG_NOT_FOUND),
			)
		})
	})
})
