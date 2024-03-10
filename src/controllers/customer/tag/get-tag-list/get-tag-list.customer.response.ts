/**
 * @swagger
 *   components:
 *     schemas:
 *       GetTagListResponse:
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: Id of tag
 *              name:
 *                type: string
 *                description: Name of tag
 */
export type GetTagListResponse = {
	id: string
	name: string
}[]

const getTagListResponseDummy = [
	{
		id: 'id',
		name: 'name',
	},
]

export const keysOfGetTagListResponse = Object.keys(
	getTagListResponseDummy[0],
) as Array<keyof GetTagListResponse>
