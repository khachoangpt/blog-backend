import prisma from '@/configs/prisma'
import type { CreateBlogParams } from '@/controllers/admin/blog/create-blog'
import type { UpdateBlogParams } from '@/controllers/admin/blog/update-blog'
import { generateId } from '@/utils'
import type { Blog, Prisma } from '@prisma/client'
import type TagService from '../tag/tag.service'

type InjectableDependency = {
	tagService: TagService
}

export default class BlogService {
	protected readonly _tagService: TagService

	constructor({ tagService }: InjectableDependency) {
		this._tagService = tagService
	}

	/**
	 * Create a blog using the provided parameters.
	 *
	 * @param {CreateBlogParams} createBlogParams - the parameters for creating the blog
	 * @return {Promise<Blog>} the created blog
	 */
	async createBlog(createBlogParams: CreateBlogParams): Promise<Blog> {
		const blog = await prisma.blog.create({
			data: {
				id: generateId('blog'),
				content: createBlogParams.content ?? '',
				summary: createBlogParams.summary ?? '',
				thumbnail: createBlogParams.thumbnail ?? '',
				title: createBlogParams.title,
				is_published: false,
			},
		})
		return blog
	}

	/**
	 * Updates a blog with the specified parameters.
	 *
	 * @param {UpdateBlogParams} blogUpdate - the parameters for updating the blog
	 * @return {Promise<Blog>} the updated blog
	 */
	async updateBlog(blogUpdate: UpdateBlogParams): Promise<Blog> {
		const { id, ...updateData } = blogUpdate
		const blogFind = await prisma.blog.findFirst({ where: { id } })
		if (!blogFind) {
			throw new Error('Blog not found')
		}
		const blog = await prisma.blog.update({ where: { id }, data: updateData })
		return blog
	}

	/**
	 * Publish a blog
	 *
	 * @param {string} id - id of blog
	 * @return {Promise<Blog>} a blog
	 */
	async publishBlog(id: string): Promise<Blog> {
		const blogFind = await prisma.blog.findFirst({ where: { id } })
		if (!blogFind) {
			throw new Error('Blog not found.')
		}
		// check blog is already published
		if (blogFind.is_published === true) {
			throw new Error('Blog is already published.')
		}
		const blog = await prisma.blog.update({
			where: { id },
			data: {
				is_published: true,
				published_at: new Date(),
			},
		})
		return blog
	}

	/**
	 * Get list of blog
	 *
	 * @param {Prisma.BlogFindManyArgs} config - config
	 * @return {Promise<{ blogs: Blog[]; total: number }>} list of blog
	 */
	async getListBlog(
		config: Prisma.BlogFindManyArgs,
		select?: Prisma.BlogSelect,
	): Promise<{ blogs: Blog[]; total: number }> {
		const blogs = await prisma.blog.findMany({
			...config,
			where: { is_published: true },
			select,
		})
		return { blogs, total: blogs.length }
	}

	/**
	 * Get blog detail by id
	 *
	 * @param {string} id - id of blog
	 * @return {Promise<Blog>} a blog
	 */
	async getBlogDetail(id: string, select?: Prisma.BlogSelect): Promise<Blog> {
		const blog = await prisma.blog.findFirst({
			where: { id, is_published: true },
			select,
		})
		if (!blog) {
			throw new Error('Blog not found')
		}
		return blog
	}
}
