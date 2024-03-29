import type TagService from '@/services/tag/tag.service'
import { validator } from '@/utils'
import { getData } from '@/utils/get-data'
import type { Request, Response } from 'express'
import { type CreateTagResponse, keysOfCreateTagResponse } from '.'
import { type CreateTagParams, createTagSchema } from './create-tag.customer.schema'

/**
 * @swagger
 *   /customer/tag:
 *     post:
 *       summary: Create a tag
 *       operationId: CreateTag
 *       description: Create a tag
 *       tags:
 *         - Tag
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTagParams'
 *       responses:
 *         201:
 *           description: A tag
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateTagResponse'
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<CreateTagParams>(createTagSchema, req.body)
	const tagService: TagService = req.scope.resolve('tagService')
	const tag = await tagService.createTag(validated)
	const createTagResponse = getData<CreateTagResponse>(tag, keysOfCreateTagResponse)
	res.status(201).json(createTagResponse)
}
