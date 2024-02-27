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

/**
 * @swagger
 *   components:
 *     schemas:
 *       Tag:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Id of tag
 *           name:
 *             type: string
 *             description: Name of tag
 *           created_at:
 *             type: string
 *             description: Created at
 *           updated_at:
 *             type: string
 *             description: Updated at
 *           blogs:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Blog'
 */
