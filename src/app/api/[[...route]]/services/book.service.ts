import type { BookSearchQuery } from "../dtos/book-search.dto"
import { BookSubmitDto } from "../dtos/book-submit.dto"
import { OpenLibrarySearchResponse } from "../types/open-library-book.type"

export const searchBooks = async (searchParams: BookSearchQuery) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchParams.query}`)
  const data: OpenLibrarySearchResponse = await response.json()

  return data
}

export const getBook = async (bookId: string) => {
  const response = await fetch(`https://openlibrary.org/books/${bookId}.json`)
  const data = await response.json()

  if (data.error) return null

  return data
}

export const submitBook = async (book: BookSubmitDto) => {
  console.log({ book })

  return true
}
