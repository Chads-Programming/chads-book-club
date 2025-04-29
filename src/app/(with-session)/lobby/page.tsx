"use client"
import { BookVoteAction } from "@/api/types/book-vote.type"
import { Paragraph } from "@/components/common"
import { Heading } from "@/components/common/heading"
import { SubmissionItem } from "@/components/submission-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { SubmissionService } from "@/services/submission"
import type { BookSubmission } from "@/types/submission-service.type"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export default function LobbyPage() {
  const [submissions, setSubmissions] = useState<BookSubmission[]>([])
  const listClassNames = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"

  const filteredSubmissions = useMemo(() => {
    return submissions.reduce(
      (acc, submission) => {
        if (submission.isVotedByMe) acc.myVotes.push(submission)
        if (submission.createdByMe) acc.mySubmissions.push(submission)
        return acc
      },
      {
        myVotes: [] as BookSubmission[],
        mySubmissions: [] as BookSubmission[],
        mostVoted: [] as BookSubmission[],
      },
    )
  }, [submissions])

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
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <Tabs defaultValue="most-voted" className="w-full">
        <TabsList className="flex flex-wrap justify-start items-center w-full max-w-max mx-auto">
          <TabsTrigger value="most-voted">Libros más votados</TabsTrigger>
          <TabsTrigger value="my-votes">Tus votos</TabsTrigger>
          <TabsTrigger value="my-submissions">Tus aportes</TabsTrigger>
        </TabsList>
        <TabsContent value="most-voted" asChild>
          <section className="flex flex-col gap-2 w-full">
            <Heading as="h2">Libros más votados ({submissions.length})</Heading>
            {submissions.length === 0 && <Paragraph>No hay libros votados</Paragraph>}
            <ul className={listClassNames}>
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
        </TabsContent>

        <TabsContent value="my-votes" asChild className="w-full">
          <section className="w-full">
            <Heading as="h2">Tus votos ({filteredSubmissions.myVotes.length})</Heading>
            {filteredSubmissions.myVotes.length === 0 && <Paragraph>No has votado ningún libro</Paragraph>}
            <ul className={listClassNames}>
              {filteredSubmissions.myVotes.map((submission) => (
                <SubmissionItem
                  handleDelete={handleDelete}
                  key={`your-vote-${submission.id}`}
                  submission={submission}
                  handleVote={handleVote}
                />
              ))}
            </ul>
          </section>
        </TabsContent>

        <TabsContent value="my-submissions" asChild className="w-full">
          <section className="w-full">
            <Heading as="h2">Tus aportes ({filteredSubmissions.mySubmissions.length})</Heading>
            {filteredSubmissions.mySubmissions.length === 0 && (
              <Paragraph>No has agregado ningún libro</Paragraph>
            )}
            <ul className={listClassNames}>
              {filteredSubmissions.mySubmissions.map((submission) => (
                <SubmissionItem
                  handleDelete={handleDelete}
                  key={`your-vote-${submission.id}`}
                  submission={submission}
                  handleVote={handleVote}
                />
              ))}
            </ul>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
