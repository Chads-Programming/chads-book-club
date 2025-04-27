import type { BookSearchQuery } from "../dtos/book-search.dto"
import type { BookSubmitDto } from "../dtos/book-submit.dto"
import type { OpenLibrarySearchResponse } from "../types/open-library-book.type"

export const searchBooks = async (searchParams: BookSearchQuery) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchParams.query}`)
  const data: OpenLibrarySearchResponse = await response.json()

  data.docs = data.docs.map((doc) => ({
    ...doc,
    key: doc.key.replace("/works/", ""),
  }))

  return data
}

export const getBook = async (bookId: string) => {
  const response = await fetch(`https://openlibrary.org/books/${bookId}.json`)
  const data = await response.json()

  if (data.error) return null

  return data
}

export const submitBook = async (book: BookSubmitDto) => {
  const foundBook = await getBook(book.id)

  if (!foundBook) return null
  
  return book
}
