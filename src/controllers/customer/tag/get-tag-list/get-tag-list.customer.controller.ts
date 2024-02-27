import { Request, Response } from 'express'

import { Tag } from '@/models/tag/tag.model'
import TagService from '@/services/tag/tag.service'
import { validateFindConfig } from '@/utils'

/**
 * @swagger
 *   /customer/tag:
 *     get:
 *       summary: Get tag list
 *       operationId: GetTags
 *       description: Get tag list
 *       parameters:
 *         - in: query
 *           name: select
 *           description: Select
 *           schema:
 *             type: string
 *           required: false
 *         - in: query
 *           name: skip
 *           description: Skip
 *           schema:
 *             type: number
 *           required: false
 *         - in: query
 *           name: take
 *           description: Take
 *           schema:
 *             type: number
 *           required: false
 *         - in: query
 *           name: relations
 *           description: Relations
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *         - in: query
 *           name: order
 *           description: Order
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *       tags:
 *         - Tag
 *       responses:
 *         200:
 *           description: An array of tags
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   tags:
 *                     type: array
 *                     description: An array of tags
 *                     items:
 *                       $ref: '#/components/schemas/Tag'
 *                   count:
 *                     type: number
 *                     description: Total tags
 */
export default async (req: Request, res: Response) => {
  const tagService: TagService = req.scope.resolve('tagService')
  const configValidated = validateFindConfig<Tag>(req.query)
  const tags = await tagService.getTagList(configValidated)
  res.status(200).json(tags)
}
