import { Request, Response } from 'express'

import BlogService from '@/services/blog/blog.service'
import { validator } from '@/utils'

import {
  UpdateBlogParams,
  updateBlogSchema,
} from './update-blog.customer.schema'

/**
 * @swagger
 *   /customer/blog:
 *     put:
 *       summary: Update a blog
 *       operationId: UpdateBlog
 *       description: Update a blog
 *       tags:
 *         - Blog
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateBlogParams'
 *       responses:
 *         201:
 *           description: A blog
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 */
export default async (req: Request, res: Response) => {
  const blogService: BlogService = req.scope.resolve('blogService')
  const validated = await validator<UpdateBlogParams>(updateBlogSchema, {
    ...req.body,
  })
  const blogUpdated = await blogService.updateBlog(validated)
  res.status(200).json(blogUpdated)
}
