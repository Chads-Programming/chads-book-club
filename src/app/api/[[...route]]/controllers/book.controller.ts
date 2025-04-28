import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { bookSearchQueryDto } from "../dtos/book-search.dto"
import { getBook, searchBooks } from "../services/book.service"
import type { Book } from "../types/book.type"

export const bookRouter = createRouter()

const FALLBACK_IMAGE = "https://dummyimage.com/500x600/ccc/fff&text=Sin%20imagen"

bookRouter.get("/search", zValidator("query", bookSearchQueryDto), async (c) => {
  const searchParams = c.req.valid("query")

  const rawBooks = await searchBooks(searchParams)

  const books: Book[] = rawBooks.docs.map((book) => ({
    key: book.key,
    title: book.title,
    coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : FALLBACK_IMAGE,
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
