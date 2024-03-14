import type BlogService from '@/services/blog/blog.service'
import { getData, getDataArray } from '@/utils/get-data'
import type { Request, Response } from 'express'
import { type GetListBlogResponseBlog, keysOfGetListBlogResponse } from '.'

/**
 * @swagger
 *   /customer/blog:
 *     get:
 *       summary: Get blog list
 *       operationId: GetBlogs
 *       description: Get blog list
 *       parameters:
 *         - in: query
 *           name: select
 *           description: Select
 *           schema:
 *             type: string
 *           required: false
 *         - in: query
 *           name: skip
 *           description: Skip
 *           schema:
 *             type: number
 *           required: false
 *         - in: query
 *           name: take
 *           description: Take
 *           schema:
 *             type: number
 *           required: false
 *         - in: query
 *           name: relations
 *           description: Relations
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *         - in: query
 *           name: order
 *           description: Order
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *       tags:
 *         - Blog
 *       responses:
 *         200:
 *           description: An array of blogs
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetListBlogResponse'
 */
export default async (req: Request, res: Response) => {
	const blogService: BlogService = req.scope.resolve('blogService')
	const { blogs, total } = await blogService.getListBlog(req.query)

	const response = {
		blogs: getDataArray<GetListBlogResponseBlog>(blogs, keysOfGetListBlogResponse),
		total,
	}
	res.status(200).json(response)
}
