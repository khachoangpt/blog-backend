import prisma from '@/configs/db'
import type { CreateBlogParams } from '@/controllers/customer/blog/create-blog/create-blog.customer.schema'
import type { UpdateBlogParams } from '@/controllers/customer/blog/update-blog/update-blog.customer.schema'
import type { Blog, Prisma } from '@prisma/client'
import { ulid } from 'ulid'
import type TagService from '../tag/tag.service'

type InjectableDependency = {
	tagService: TagService
}

export default class BlogService {
	protected readonly _tagService: TagService

	constructor({ tagService }: InjectableDependency) {
		this._tagService = tagService
	}

	async createBlog(createBlogParams: CreateBlogParams): Promise<Blog> {
		const blog = prisma.blog.create({
			data: {
				id: `blog_${ulid()}`,
				content: createBlogParams.content ?? '',
				summary: createBlogParams.summary ?? '',
				thumbnail: createBlogParams.thumbnail ?? '',
				title: createBlogParams.title,
				is_published: false,
			},
		})
		return blog
	}

	async updateBlog(blogUpdate: UpdateBlogParams): Promise<Blog | null> {
		const { id, ...updateData } = blogUpdate
		const blogFind = await prisma.blog.findFirst({ where: { id } })
		if (!blogFind) {
			throw new Error('Blog not found')
		}
		const blog = await prisma.blog.update({ where: { id }, data: updateData })
		return blog
	}

	async publishBlog(id: string): Promise<Blog | null> {
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

	async getListBlog(
		config: Prisma.BlogFindManyArgs,
	): Promise<{ blogs: Blog[]; count: number }> {
		const blogs = await prisma.blog.findMany({
			...config,
			where: { is_published: true },
		})
		return { blogs, count: blogs.length }
	}

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
