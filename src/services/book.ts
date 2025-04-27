import { kirbapi } from "./kirbapi"
import { Book } from "@/api/types/book.type"

export type BookSearchResponse = {
  message: string
  data: Book[]
  totalCount: number
}

export const BookService = {
  getBooksByQuery: async (query: string) => {
    try {
      const data = await kirbapi.get<BookSearchResponse>(`books/search?query=${query}`)
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
