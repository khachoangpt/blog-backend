import z from 'zod'

export const updateBlogSchema = z.object({
  id: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title can not be empty'),
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title can not be empty'),
  summary: z.string().optional(),
  thumbnail: z.string().optional(),
  content: z.string().optional(),
})

export type UpdateBlogParams = z.infer<typeof updateBlogSchema>
