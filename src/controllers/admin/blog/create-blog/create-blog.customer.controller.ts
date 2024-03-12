import type BlogService from '@/services/blog/blog.service'
import { validator } from '@/utils'
import type { Request, Response } from 'express'
import {
	type CreateBlogParams,
	createBlogSchema,
} from './create-blog.customer.schema'

/**
 * @swagger
 *   /customer/blog:
 *     post:
 *       summary: Create a blog
 *       operationId: CreateBlog
 *       description: Create a blog
 *       tags:
 *         - Blog
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBlogParams'
 *       responses:
 *         201:
 *           description: A blog
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateBlogResponse'
 */
export default async (req: Request, res: Response) => {
	const blogService: BlogService = req.scope.resolve('blogService')
	const validated = await validator<CreateBlogParams>(
		createBlogSchema,
		req.body,
	)
	const blog = await blogService.createBlog(validated)
	res.status(200).json(blog)
}
