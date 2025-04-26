import { Heading } from "./common"
import { Button } from "./ui"

export const BookVotation = () => {
  return (
    <section className="flex flex-col gap-10 items-start">
      <Button className="self-end">Agregar libro</Button>

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
