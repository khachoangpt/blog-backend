import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
} from 'typeorm'

import { generateId } from '@/utils'

import { BaseModel } from '../base/base.model'
import { Tag } from '../tag/tag.model'

@Entity({ name: 'blogs' })
export class Blog extends BaseModel {
  @Index()
  @Column({ type: 'varchar', length: '256' })
  title: string

  @Column({ type: 'text', nullable: true })
  summary: string

  @Column({ type: 'text', nullable: true })
  thumbnail: string

  @Column({ type: 'text', nullable: true })
  content: string

  @Column({ type: 'boolean' })
  is_published: boolean

  @Column({ type: 'timestamptz', nullable: true })
  published_at: Date

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  @JoinTable({
    name: 'blogs_tags',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[]

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateId(this.id, 'blog')
  }
}
