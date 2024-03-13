import type BlogService from '@/services/blog/blog.service'
import { getData } from '@/utils/get-data'
import type { Request, Response } from 'express'
import { type PublishBlogResponse, keysOfPublishBlogResponse } from '.'

/**
 * @swagger
 *   /customer/blog/{id}:
 *     patch:
 *       summary: Publish blog
 *       operationId: PublishBlog
 *       description: Publish blog
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
 *                 $ref: '#/components/schemas/PublishBlogResponse'
 */
export default async (req: Request, res: Response) => {
	const id = req.params.id
	const blogService: BlogService = req.scope.resolve('blogService')
	const blogUpdated = await blogService.publishBlog(id)
	res.status(200).json(getData<PublishBlogResponse>(blogUpdated, keysOfPublishBlogResponse))
}
