import prisma from "../db/prisma"
import type { BookSubmitDto } from "../dtos/book-submit.dto"
import { getBookDetails } from "./book.service"

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
