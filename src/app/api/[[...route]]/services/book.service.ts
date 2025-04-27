import type { BookSearchQuery } from "../dtos/book-search.dto"
import type {
  OpenLibraryAuthorResponse,
  OpenLibraryBookGetResponse,
  OpenLibraryBookRatingsResponse,
  OpenLibrarySearchResponse,
} from "../types/open-library-book.type"

export const searchBooks = async (searchParams: BookSearchQuery) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchParams.query}&limit=10&fields=key,title,cover_i,author_name,first_publish_year,ratings_average`)
  const data: OpenLibrarySearchResponse = await response.json()
  data.docs = data.docs.map((doc) => ({
    ...doc,
    key: doc.key.replace("/works/", ""),
  }))

  return data
}

export const getBook = async (bookId: string): Promise<OpenLibraryBookGetResponse | null> => {
  const response = await fetch(`https://openlibrary.org/books/${bookId}.json`)
  const data = await response.json()

  if (data.error) return null

  return data
}

export const getBookDetails = async (bookId: string) => {
  const book = await getBook(bookId)
  if (!book) return null
  const ratings = await getBookRatings(bookId)
  const authorsRes = await Promise.all(
    book.authors?.map(async (author) => await getAuthor(author.author.key)) || [],
  )

  const authors = authorsRes.filter((author) => !!author).map((author) => author.name)
  return {
    ...book,
    rating: ratings?.average || 0,
    authors,
  }
}

export const getAuthor = async (authorId: string) => {
  const response = await fetch(`https://openlibrary.org/${authorId}.json`)
  const data: OpenLibraryAuthorResponse = await response.json()
  if ((data as any).error) return null

  return data
}

export const getBookRatings = async (bookId: string) => {
  const response = await fetch(`https://openlibrary.org/works/${bookId}/ratings.json`)
  const data: OpenLibraryBookRatingsResponse = await response.json()
  if ((data as any).error) return null
  return data.summary
}
