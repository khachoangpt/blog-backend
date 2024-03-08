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
