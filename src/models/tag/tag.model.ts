import { BeforeInsert, Column, Entity, ManyToMany } from 'typeorm'

import { generateId } from '@/utils'

import { BaseModel } from '../base/base.model'
import { Blog } from '../blog/blog.model'

@Entity({ name: 'tags' })
export class Tag extends BaseModel {
  @Column('varchar')
  name: string

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[]

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateId(this.id, 'tag')
  }
}
