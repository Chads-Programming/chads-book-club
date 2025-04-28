"use client"
import { BookVoteAction } from "@/api/types/book-vote.type"
import { Heading } from "@/components/common/heading"
import { SubmissionItem } from "@/components/submission-item"
import { SubmissionService } from "@/services/submission"
import type { BookSubmission } from "@/types/submission-service.type"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function LobbyPage() {
  const [submissions, setSubmissions] = useState<BookSubmission[]>([])

  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissions = await SubmissionService.getSubmissions()
      setSubmissions(submissions.data)
    }
    fetchSubmissions()
  }, [])

  const handleDelete = async (id: string) =>
    toast.promise(SubmissionService.delete(id), {
      loading: "Eliminando...",
      success: "Eliminado correctamente",
      error: "Error al eliminar",
      finally() {
        setSubmissions(submissions.filter((submission) => submission.id !== id))
      },
    })

  const handleVote = async (id: string, action: BookVoteAction) => {
    try {
      await SubmissionService.vote(id, action)
      if (action === BookVoteAction.LIKE) {
        const newSubmissions = submissions
          .map((submission) =>
            submission.id === id
              ? { ...submission, isVotedByMe: true, votes: submission.votes + 1 }
              : submission,
          )
          .sort((a, b) => b.votes - a.votes)
        setSubmissions(newSubmissions)
      } else {
        const newSubmissions = submissions
          .map((submission) =>
            submission.id === id
              ? { ...submission, isVotedByMe: false, votes: submission.votes - 1 }
              : submission,
          )
          .sort((a, b) => b.votes - a.votes)
        setSubmissions(newSubmissions)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full flex justify-between items-start gap-10">
      <section className="flex flex-col gap-2">
        <Heading>Libros más votados</Heading>
        <ul>
          {submissions.map((submission) => (
            <SubmissionItem
              handleDelete={handleDelete}
              key={submission.id}
              submission={submission}
              handleVote={handleVote}
            />
          ))}
        </ul>
      </section>

      <section>
        <Heading as="h2">Tus votos</Heading>
        <ul className="flex flex-col gap-10">
          {submissions
            .filter((submission) => submission.isVotedByMe || submission.createdByMe)
            .map((submission) => (
              <SubmissionItem
                handleDelete={handleDelete}
                key={`your-vote-${submission.id}`}
                submission={submission}
                handleVote={handleVote}
              />
            ))}
        </ul>
      </section>
    </div>
  )
}
