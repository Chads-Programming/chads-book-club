import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { bookSearchQueryDto } from "../dtos/book-search.dto"
import { getBook, searchBooks } from "../services/book.service"
import { Book } from "../types/book.type"

export const bookRouter = createRouter()

bookRouter.get("/search", zValidator("query", bookSearchQueryDto), async (c) => {
  const searchParams = c.req.valid("query")

  const rawBooks = await searchBooks(searchParams)

  const books: Book[] = rawBooks.docs.map((book) => ({
    key: book.key,
    title: book.title,
    coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
    authors: book.author_name,
    publishYear: book.first_publish_year,
    rating: book.ratings_average,
  }))

  return c.json({
    message: "Books Found",
    data: books,
    totalCount: rawBooks.numFound,
  })
})

bookRouter.get("/:id", async (c) => {
  const bookId = c.req.param("id")

  const book = await getBook(bookId)

  if (!book)
    return c.json(
      {
        message: "Book Not Found",
      },
      404,
    )

  return c.json({
    message: "Book Submitted",
    data: book,
  })
})
