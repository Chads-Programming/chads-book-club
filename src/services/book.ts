import type { OpenLibraryBook } from "@/api/types/open-library-book.type"
import { kirbapi } from "./kirbapi"

export type OpenLibraryBookSearchResponse = {
  message: string
  books: OpenLibraryBook[]
  totalCount: number
}

export const BookService = {
  getBooksByQuery: async (query: string) => {
    try {
      const data = await kirbapi.get<OpenLibraryBookSearchResponse>(`books/search?query=${query}`)
      return data
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message)
      }

      console.error(e)

      return null
    }
  },
}
