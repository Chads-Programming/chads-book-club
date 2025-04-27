"use client"

import { Heading } from "@/components/common"
import { CardBook } from "@/components/common/card-book"
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { KirbContext } from "@/context"
import { BookService } from "@/services/book"
import { useContext, useEffect } from "react"

export default function AddBookPage() {
  const { dispatch } = useContext(KirbContext)

  useEffect(() => {
    const getBooks = async () => {
      const res = await BookService.getBooksByQuery("harry potter")
      if (!res) return

      const book = { books: res.books, totalCount: res.totalCount }

      dispatch({ type: "SET_BOOKS", payload: book })
    }
    getBooks()
  }, [dispatch])

  return (
    <section className="flex flex-col gap-10 items-center">
      <Heading>Agrega un libro</Heading>

      <div className="flex gap-2 w-full max-w-xs">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Libros</SelectLabel>
              <SelectItem value="harry potter">Harry Potter</SelectItem>
              <SelectItem value="harry potter">Harry Potter</SelectItem>
              <SelectItem value="harry potter">Harry Potter</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="Busca un libro" />
      </div>

      <CardBook srcImage="https://placehold.co/400x300" title="Libro" stars={3} />
    </section>
  )
}
