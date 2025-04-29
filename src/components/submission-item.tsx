import { BookVoteAction } from "@/api/types/book-vote.type"
import type { BookSubmission } from "@/types/submission-service.type"
// import { Heart } from "lucide-react"
import BookRemovalConfirm from "./book-removal-confirm"
import { CardBook } from "./common/card-book"
import { useState } from "react"

interface SubmissionItemProps {
  submission: BookSubmission
  handleVote: (id: string, action: BookVoteAction) => void
  handleDelete: (id: string) => void
}

export const SubmissionItem = ({ handleVote, submission, handleDelete }: SubmissionItemProps) => {
  const alreadyVoted = submission.isVotedByMe
  const [liked, setLiked] = useState<boolean>(alreadyVoted)

  const vote = () => {
    handleVote(submission.id, alreadyVoted ? BookVoteAction.DISLIKE : BookVoteAction.LIKE)
    setLiked(!alreadyVoted)
  }

  return (
    <li key={submission.id} className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <CardBook
          small
          title={submission.title}
          authors={submission.authors}
          id={submission.id}
          srcImage={submission.coverUrl}
          votations={submission.votes}
          handleActionTrigger={vote}
          liked={liked}
        />
        {submission.createdByMe && <BookRemovalConfirm handleConfirm={() => handleDelete(submission.id)} />}
      </div>
    </li>
  )
}
