import type { BookSearchQuery } from "../dtos/book-search.dto"
import { OpenLibrarySearchResponse } from "../types/open-library-book.type"

export const searchBooks = async (searchParams: BookSearchQuery) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchParams.query}`)
  const data: OpenLibrarySearchResponse = await response.json()

  return data
}
