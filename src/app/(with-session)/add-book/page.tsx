"use client"

import { Heading } from "@/components/common"
import { CardBook } from "@/components/common/card-book"
import {
  Input,
} from "@/components/ui"
import { useBooks } from "@/context/book-context"
import { useDebounceCallback } from "@/hooks/use-debouce.hook"
import { BookService } from "@/services/book"
import { useEffect, useState } from "react"

export default function AddBookPage() {
  const [search, setSearch] = useState("")
  const { state, setBooks, clearBooks } = useBooks()
  const debounceCallback = useDebounceCallback(1000)

  const onSearch = async (search: string) => {
    const res = await BookService.getBooksByQuery(search)
    if (!res) return

    const data = { books: res.data, totalCount: res.totalCount }

    setBooks(data)
  }

  useEffect(() => {
    if (!search.length) return clearBooks()
    debounceCallback(() => onSearch(search))
  }, [search])

  return (
    <section className="w-full flex flex-col gap-10 items-center">
      <Heading>Agrega un libro</Heading>

      <Input
        className="max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Busca un libro"
      />

      <div className="flex flex-wrap gap-4 mx-auto justify-center">
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
    </section>
  )
}
