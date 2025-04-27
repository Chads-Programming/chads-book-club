import { BookVoteAction } from "@/api/types/book-vote.type"
import { cn } from "@/lib/utils"
import type { BookSubmission } from "@/types/submission-service.type"
import { Heart } from "lucide-react"
import BookRemovalConfirm from "./book-removal-confirm"

interface SubmissionItemProps {
  submission: BookSubmission
  handleVote: (id: string, action: BookVoteAction) => void
  handleDelete: (id: string) => void
}

export const SubmissionItem = ({ handleVote, submission, handleDelete }: SubmissionItemProps) => {
  return (
    <div key={submission.id} className="flex justify-between items-center gap-4">
      <p>{submission.title}</p>
      <div className="flex items-center gap-2">
        <Heart
          className={cn("cursor-pointer", submission.isVotedByMe && "fill-[#d53a3a]")}
          size={20}
          color="#d53a3a"
          onClick={() =>
            handleVote(submission.id, submission.isVotedByMe ? BookVoteAction.DISLIKE : BookVoteAction.LIKE)
          }
        />
        <p>{submission.votes}</p>
        {submission.createdByMe && <BookRemovalConfirm handleConfirm={() => handleDelete(submission.id)} />}
      </div>
    </div>
  )
}
