import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { bookSearchQuery } from "../dtos/book-search.dto"
import { searchBooks } from "../services/book.service"

export const bookRouter = createRouter()

//bookRouter.use("/*", userMiddleware)

bookRouter.get("/search", zValidator("query", bookSearchQuery), async (c) => {
  const searchParams = c.req.valid("query")

  const books = await searchBooks(searchParams)

  return c.json({
    message: "Books Found",
    books: books.docs,
    totalCount: books.numFound
  })
})
