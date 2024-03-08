import type BlogService from '@/services/blog/blog.service'
import type { Request, Response } from 'express'

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
 *                 type: object
 *                 properties:
 *                   blogs:
 *                     type: array
 *                     description: An array of blogs
 *                     items:
 *                       $ref: '#/components/schemas/Blog'
 *                   count:
 *                     type: number
 *                     description: Total blogs
 */
export default async (req: Request, res: Response) => {
	const blogService: BlogService = req.scope.resolve('blogService')
	const blogs = await blogService.getListBlog(req.query)
	res.status(200).json(blogs)
}
