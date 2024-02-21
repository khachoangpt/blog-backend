import { Request, Response } from 'express'

import BlogService from '@/services/blog/blog.service'
import { validator } from '@/utils'

import {
  UpdateBlogParams,
  updateBlogSchema,
} from './update-blog.customer.schema'

export default async (req: Request, res: Response) => {
  const blogService: BlogService = req.scope.resolve('blogService')
  const validated = await validator<UpdateBlogParams>(updateBlogSchema, {
    ...req.body,
  })
  const blogUpdated = await blogService.updateBlog(validated)
  res.status(200).json(blogUpdated)
}
