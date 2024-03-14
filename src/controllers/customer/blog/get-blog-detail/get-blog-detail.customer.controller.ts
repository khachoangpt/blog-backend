import type BlogService from '@/services/blog/blog.service'
import { getData } from '@/utils/get-data'
import type { Request, Response } from 'express'
import { type GetBlogDetailResponse, keysOfGetBlogDetailResponse } from '.'

/**
 * @swagger
 *   /customer/blog/{id}:
 *     get:
 *       summary: Get blog detail
 *       operationId: GetBlogDetail
 *       description: Get blog detail
 *       parameters:
 *         - in: path
 *           name: id
 *           description: Id of blog
 *           schema:
 *             type: string
 *           required: true
 *       tags:
 *         - Blog
 *       responses:
 *         200:
 *           description: A blog
 *           content:
 *             application:
 *               schema:
 *                 $ref: '#/components/schemas/GetBlogDetailResponse'
 */
export default async (req: Request, res: Response) => {
	const id = req.params.id
	const blogService: BlogService = req.scope.resolve('blogService')
	const blog = await blogService.getBlogDetail(id)
	const blogResponse = getData<GetBlogDetailResponse>(blog, keysOfGetBlogDetailResponse)
	res.status(200).json(blogResponse)
}
