import dataSource from '@/configs/ormconfig'
import { Blog } from '@/models/blog/blog.model'

export const BlogRepository = dataSource.getRepository(Blog)

export default () => BlogRepository
