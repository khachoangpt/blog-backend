import { ILike } from 'typeorm'

import { CreateTagParams } from '@/controllers/customer/tag/create-tag/create-tag.customer.schema'
import { Tag } from '@/models/tag/tag.model'
import { TagRepository } from '@/repositories/tag.repository'
import { FindConfig } from '@/type'

type InjectableDependencies = {
  tagRepository: typeof TagRepository
}

export default class TagService {
  protected readonly _tagRepository: typeof TagRepository

  constructor({ tagRepository }: InjectableDependencies) {
    this._tagRepository = tagRepository
  }

  async createTag(createTagParams: CreateTagParams) {
    const tagFind = await this._tagRepository.findOne({
      where: { name: ILike(createTagParams.name) },
    })
    if (tagFind) {
      throw new Error('Tag is already exist')
    }
    const tagCreated = this._tagRepository.create({
      name: createTagParams.name,
    })
    const tagNew = await this._tagRepository.save(tagCreated)
    return tagNew
  }

  async getTagList(
    config: FindConfig<Tag> = {
      skip: 0,
      take: 50,
      order: { created_at: 'ASC' },
    },
  ): Promise<{ tags: Tag[]; count: number }> {
    const [tags, count] = await this._tagRepository.findAndCount({
      ...config,
    })
    return { tags, count }
  }
}
