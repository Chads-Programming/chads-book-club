import type { BookVoteAction } from "@/api/types/book-vote.type"
import { kirbapi } from "./kirbapi"
import type {
  BookSubmission,
  BookSubmissionResponse,
  BookSubmitResponse,
  BookVoteResponse,
} from "@/types/submission-service.type"

export const SubmissionService = {
  submitBook: async (id: string) => {
    const data = await kirbapi.post<BookSubmitResponse>("submissions", {
      id,
    })
    return data
  },
  getSubmissions: async () => {
    const data = await kirbapi.get<BookSubmissionResponse>("submissions")
    return data
  },
  vote: async (id: string, action: BookVoteAction) => {
    const data = await kirbapi.post<BookVoteResponse>(`submissions/${id}/votes`, {
      action,
    })
    return data
  },
  delete: async (id: string) => {
    const data = await kirbapi.delete(`submissions/${id}`)
    return data
  },
  update: async (id: string, data: BookSubmission) => {
    const response = await kirbapi.put(`submissions/${id}`, data)
    return response
  },
}
