import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { bookSearchQueryDto } from "../dtos/book-search.dto"
import { getBook, searchBooks } from "../services/book.service"

export const bookRouter = createRouter()

bookRouter.get("/search", zValidator("query", bookSearchQueryDto), async (c) => {
  const searchParams = c.req.valid("query")

  const books = await searchBooks(searchParams)

  return c.json({
    message: "Books Found",
    data: books.docs,
    totalCount: books.numFound
  })
})

bookRouter.get("/:id", async (c) => {
  const bookId = c.req.param("id")

  const book = await getBook(bookId)

  if (!book) {
    return c.json(
      {
        message: "Book Not Found",
      },
      404,
    )
  }

  return c.json({
    message: "Book Submitted",
    data: book,
  })
})
