import TagService from '../tag/tag.service'

type InjectableDependency = {
  _tagService: TagService
}

export default class BlogService {
  protected readonly tagService: TagService

  constructor({ _tagService }: InjectableDependency) {
    this.tagService = _tagService
  }
}
