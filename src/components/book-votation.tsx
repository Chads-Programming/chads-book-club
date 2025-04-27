import { useContext } from "react"
import { Heading } from "./common"
import { Button } from "./ui"
import { KirbContext } from "@/context"
import Link from "next/link"

export const BookVotation = () => {
  const { logout } = useContext(KirbContext)

  return (
    <section className="flex flex-col gap-10 items-start">
      <div className="self-end flex justify-start items-start gap-2">
        <Button variant="ghost" onClick={logout}>
          Cerrar sesión
        </Button>
        <Link href="/add-book">
          <Button asChild>
            <span>Agregar libro</span>
          </Button>
        </Link>
      </div>

      <div className="w-full flex justify-between items-start gap-10">
        <section>
          <Heading as="h2">Libros más votados</Heading>
        </section>

        <section>
          <Heading as="h2">Tus votos</Heading>
        </section>
      </div>
    </section>
  )
}
