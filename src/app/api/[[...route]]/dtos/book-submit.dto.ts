import { z } from "zod"

export const bookSubmitDto = z.object({
  id: z.string(),
})

export type BookSubmitDto = z.infer<typeof bookSubmitDto>
