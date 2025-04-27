import type { BookVoteAction } from "@/api/types/book-vote.type"

export type BookSubmission = {
  id: string
  title: string
  authors: string[]
  coverUrl: string
  votes: number
  isVotedByMe: boolean
  createdByMe: boolean
}
export type BookSubmissionResponse = {
  message: string
  data: BookSubmission[]
}

export type BookSubmitResponse = {
  message: string
  data: BookSubmission[]
}

export type BookVoteResponse = {
  message: string
  data: BookVoteAction
}
