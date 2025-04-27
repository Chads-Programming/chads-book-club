import { z } from "zod"
import { BookVoteAction } from "../types/book-vote.type"

export const submitVoteDto = z.object({
  action: z.nativeEnum(BookVoteAction),
})

export type SubmitVoteDto = z.infer<typeof submitVoteDto>
