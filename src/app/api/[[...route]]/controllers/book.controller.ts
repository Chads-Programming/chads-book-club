import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { bookSearchQueryDto } from "../dtos/book-search.dto"
import { getBook, searchBooks, submitBook } from "../services/book.service"
import { bookSubmitDto } from "../dtos/book-submit.dto"
import { userMiddleware } from "../middlewares/user.middleware"
import { UserPayload } from "../types/user-payload.type"

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

bookRouter.get('/:id', async (c) => {
  const bookId = c.req.param("id")

  const book = await getBook(bookId)

  if (!book) {
    return c.json({
      message: "Book Not Found",
    }, 404)
  }

  return c.json({
    message: "Book Submitted",
    book
  })
})
bookRouter.post('/submit-book', userMiddleware, zValidator("json", bookSubmitDto), async (c) => {

  const user: UserPayload | null = c.get('jwtPayload')
  const book = c.req.valid("json")

  const bookSubmit = await submitBook(book)

  
  return c.json({
    message: "Book Submitted",
    bookSubmit
  })
})
