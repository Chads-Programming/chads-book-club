import { z } from "zod";

export const bookSubmitDto = z.object({
    bookId: z.string(),
})