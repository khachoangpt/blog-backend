import prisma from '@/configs/db'
import type { CreateBlogParams, CreateBlogResponse } from '@/controllers/admin/blog/create-blog'
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
	 * @return {Promise<CreateBlogResponse>} the created blog
	 */
	async createBlog(createBlogParams: CreateBlogParams): Promise<CreateBlogResponse> {
		const blog = prisma.blog.create({
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
	 * @return {Promise<Blog | null>} the updated blog, or null if the blog is not found
	 */
	async updateBlog(blogUpdate: UpdateBlogParams): Promise<Blog | null> {
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
	 * Retrieves a list of blogs based on the provided configuration.
	 *
	 * @param {Prisma.BlogFindManyArgs} config - The configuration for filtering and pagination.
	 * @return {Promise<{ blogs: Blog[]; count: number }>} An object containing the list of blogs and the total count.
	 */
	async getListBlog(config: Prisma.BlogFindManyArgs): Promise<{ blogs: Blog[]; count: number }> {
		const blogs = await prisma.blog.findMany({
			...config,
			where: { is_published: true },
		})
		return { blogs, count: blogs.length }
	}

	/**
	 * Retrieves the details of a blog by its ID.
	 *
	 * @param {string} id - The ID of the blog
	 * @return {Promise<any>} The details of the blog
	 */
	async getBlogDetail(id: string) {
		const blog = await prisma.blog.findFirst({
			where: { id, is_published: true },
		})
		if (!blog) {
			throw new Error('Blog not found')
		}
		return blog
	}
}
