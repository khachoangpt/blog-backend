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
 *               deleted_at:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *         count:
 *           type: integer
 */
export type GetTagListResponse = {
	tags: {
		id: string
		name: string
		created_at: Date
		updated_at: Date
		deleted_at: Date | null
	}[]
	count: number
}
