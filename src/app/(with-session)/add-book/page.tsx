"use client"

import { Heading } from "@/components/common"
import { CardBook } from "@/components/common/card-book"
import { Input } from "@/components/ui"
import { useBooks } from "@/context/book-context"
import { useDebounceCallback } from "@/hooks/use-debouce.hook"
import { BookService } from "@/services/book"
import { Loader2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

export default function AddBookPage() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { state, setBooks, clearBooks } = useBooks()
  const debounceCallback = useDebounceCallback(1000)

  const onSearch = useCallback(
    async (search: string) => {
      try {
        setIsLoading(true)
        const res = await BookService.getBooksByQuery(search)
        if (!res) return

        const data = { books: res.data, totalCount: res.totalCount }

        setBooks(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [setBooks],
  )

  useEffect(() => {
    if (!search.length) return clearBooks()
    debounceCallback(() => onSearch(search))
  }, [search, clearBooks, debounceCallback, onSearch])

  return (
    <section className="w-full flex flex-col gap-10 items-center">
      <Heading>Agrega un libro</Heading>

      <Input
        className="max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Busca un libro"
      />

      {isLoading ? (
        <Loader2 size={34} className="animate-spin mt-12" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4">
          {state.books.books.map((book) => (
            <CardBook
              key={book.key}
              id={book.key}
              srcImage={book.coverUrl}
              authors={book.authors}
              title={book.title}
              stars={book.rating}
            />
          ))}
        </div>
      )}
    </section>
  )
}
