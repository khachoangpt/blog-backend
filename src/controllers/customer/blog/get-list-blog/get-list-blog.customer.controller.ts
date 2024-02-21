import { Request, Response } from 'express'

import { Blog } from '@/models/blog/blog.model'
import BlogService from '@/services/blog/blog.service'
import { validateFindConfig } from '@/utils'

export default async (req: Request, res: Response) => {
  const blogService: BlogService = req.scope.resolve('blogService')
  const configValidated = validateFindConfig<Blog>(req.query)
  const blogs = await blogService.getListBlog(configValidated)
  res.status(200).json(blogs)
}
