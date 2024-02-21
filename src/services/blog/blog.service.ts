import { CreateBlogParams } from '@/controllers/customer/blog/create-blog/create-blog.customer.schema'
import { UpdateBlogParams } from '@/controllers/customer/blog/update-blog/update-blog.customer.schema'
import { Blog } from '@/models/blog/blog.model'
import { BlogRepository } from '@/repositories/blog.repository'
import { FindConfig } from '@/type'

import TagService from '../tag/tag.service'

type InjectableDependency = {
  tagService: TagService
  blogRepository: typeof BlogRepository
}

export default class BlogService {
  protected readonly _blogRepository: typeof BlogRepository
  protected readonly _tagService: TagService

  constructor({ tagService, blogRepository }: InjectableDependency) {
    this._tagService = tagService
    this._blogRepository = blogRepository
  }

  async createBlog(createBlogParams: CreateBlogParams): Promise<Blog> {
    const blogCreated = this._blogRepository.create({
      ...createBlogParams,
      is_published: false,
    })
    const blog = await this._blogRepository.save(blogCreated)
    return blog
  }

  async updateBlog(blogUpdate: UpdateBlogParams): Promise<Blog | null> {
    const { id, ...updateData } = blogUpdate
    const blogFind = await this._blogRepository.findOne({ where: { id } })
    if (!blogFind) {
      throw new Error('Blog not found')
    }
    await this._blogRepository.update(id, updateData)
    return await this._blogRepository.findOne({ where: { id } })
  }

  async getListBlog(
    config: FindConfig<Blog> = {
      skip: 0,
      take: 50,
      order: { created_at: 'DESC' },
    },
  ): Promise<{ blogs: Blog[]; count: number }> {
    const [blogs, count] = await this._blogRepository.findAndCount(config)
    return { blogs, count }
  }
}
