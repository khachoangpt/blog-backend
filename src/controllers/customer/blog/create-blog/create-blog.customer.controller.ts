import { Request, Response } from 'express'

import BlogService from '@/services/blog/blog.service'
import { validator } from '@/utils'

import {
  CreateBlogParams,
  createBlogSchema,
} from './create-blog.customer.schema'

export default async (req: Request, res: Response) => {
  const blogService: BlogService = req.scope.resolve('blogService')
  const validated = await validator<CreateBlogParams>(
    createBlogSchema,
    req.body,
  )
  const blog = await blogService.createBlog(validated)
  res.status(200).json(blog)
}
