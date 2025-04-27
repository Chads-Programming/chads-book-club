import type { Prisma } from "@prisma/client"
import prisma from "../db/prisma"
import type { BookSubmitDto } from "../dtos/book-submit.dto"
import { getBookDetails } from "./book.service"
import { BookVoteAction } from "../types/book-vote.type"

export const submitBook = async (book: BookSubmitDto, userId: string) => {
  const foundSubmission = await prisma.bookSubmission.findUnique({
    where: {
      bookId: book.id,
    },
  })

  if (foundSubmission) throw new Error("Book already submitted")

  const foundBook = await getBookDetails(book.id)

  if (!foundBook) return null

  const submission = await prisma.bookSubmission.create({
    data: {
      bookId: book.id,
      userId: userId,
      coverUrl: foundBook.covers.length
        ? `https://covers.openlibrary.org/b/id/${foundBook.covers[0]}-M.jpg`
        : null,
      title: foundBook.title,
      authors: foundBook.authors,
      votes: {
        create: {
          userId,
        },
      },
    },
  })

  return submission
}

export const findSubmissionsWithVotes = async (where: Prisma.BookSubmissionWhereInput, userId: string) => {
  const submissionsRaw = await prisma.bookSubmission.findMany({
    where,
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
      votes: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  const submissions = submissionsRaw.map((submission) => {
    const { _count, ...rest } = submission
    return {
      ...rest,
      isVotedByMe: submission.votes.some((vote) => vote.userId === userId),
      votes: submission?._count?.votes || 0,
      createdByMe: submission.userId === userId,
    }
  })

  return submissions
}

export const submitVote = async (submissionId: string, action: BookVoteAction, userId: string) => {
  const submission = await prisma.bookSubmission.findUnique({
    where: {
      id: submissionId,
    },
  })

  if (!submission) throw new Error("Submission not found")
  if (action === BookVoteAction.LIKE)
    await prisma.submissionVote.create({
      data: {
        bookSubmissionId: submissionId,
        userId,
      },
    })
  else if (action === BookVoteAction.DISLIKE)
    await prisma.submissionVote.deleteMany({
      where: {
        userId,
        bookSubmissionId: submissionId,
      },
    })

  return action
}

export const deleteSubmission = async (submissionId: string, userId: string) => {
  const submission = await prisma.bookSubmission.findUnique({
    where: {
      id: submissionId,
      userId,
    },
  })

  if (!submission) throw new Error("Submission not found")

  return await prisma.bookSubmission.deleteMany({
    where: {
      id: submissionId,
      userId,
    },
  })
}
