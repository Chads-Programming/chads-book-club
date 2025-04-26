import { z } from "zod";

export const bookSearchQuery = z.object({
    query: z.string().min(1),
})

export type BookSearchQuery = z.infer<typeof bookSearchQuery>