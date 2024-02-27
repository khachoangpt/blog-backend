import dataSource from '@/configs/ormconfig'
import { Tag } from '@/models/tag/tag.model'

export const TagRepository = dataSource.getRepository(Tag)

export default () => TagRepository
