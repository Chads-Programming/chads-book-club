import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { bookSearchQueryDto } from "../dtos/book-search.dto"
import { searchBooks } from "../services/book.service"
import { bookSubmitDto } from "../dtos/book-submit.dto"
import { userMiddleware } from "../middlewares/user.middleware"

export const bookRouter = createRouter()

//bookRouter.use("/*", userMiddleware)

bookRouter.get("/search", zValidator("query", bookSearchQueryDto), async (c) => {
  const searchParams = c.req.valid("query")

  const books = await searchBooks(searchParams)

  return c.json({
    message: "Books Found",
    books: books.docs,
    totalCount: books.numFound
  })
})

bookRouter.post('/submit-book', userMiddleware, zValidator("json", bookSubmitDto), async (c) => {
  
})
