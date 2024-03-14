import getKeysOfNestedObject from '@/utils/get-keys-nested-object'

/**
 * @swagger
 *   components:
 *     schemas:
 *       CreateTagResponse:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Id of tag
 *           name:
 *             type: string
 *             description: Name of tag
 */
export type CreateTagResponse = {
	id: string
	name: string
}

const createTagResponseDummy = {
	id: 'id',
	name: 'name',
}

export const keysOfCreateTagResponse = getKeysOfNestedObject(createTagResponseDummy)
