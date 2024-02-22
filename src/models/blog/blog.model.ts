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

/**
 * @swagger
 *   components:
 *     schemas:
 *       Blog:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Id of blog
 *           title:
 *             type: string
 *             description: Title of blog
 *           summary:
 *             type: string
 *             description: Summary of blog
 *           thumbnail:
 *             type: string
 *             description: Thumbnail of blog
 *           content:
 *             type: string
 *             description: Content of blog
 *           tags:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Tag'
 *           is_published:
 *             type: string
 *             description: Check blog is public or not
 *           published_at:
 *             type: string
 *             description: Published at of blog
 *           created_at:
 *             type: string
 *             description: Created at
 *           updated_at:
 *             type: string
 *             description: Updated at
 */
