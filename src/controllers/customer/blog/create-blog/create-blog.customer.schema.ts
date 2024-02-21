import z from 'zod'

export const createBlogSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title can not be empty'),
  summary: z.string().optional(),
  thumbnail: z.string().optional(),
  content: z.string().optional(),
})

export type CreateBlogParams = z.infer<typeof createBlogSchema>
