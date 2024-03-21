import getKeysOfNestedObject from '@/utils/get-keys-nested-object'

/**
 * @swagger
 * components:
 *   schemas:
 *     GetTagListResponse:
 *       type: object
 *       properties:
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               created_at:
 *                 type: string
 *                 format: date-time
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *         count:
 *           type: integer
 */
export type GetTagListResponse = {
	tags: {
		id: string
		name: string
		created_at: Date
		updated_at: Date
	}[]
	total: number
}

const getTagListResponseDummy: GetTagListResponse = {
	tags: [
		{
			id: 'id',
			name: 'name',
			created_at: new Date(),
			updated_at: new Date(),
		},
	],
	total: 0,
}

export const keysOfGetTagListResponse = getKeysOfNestedObject(getTagListResponseDummy)
