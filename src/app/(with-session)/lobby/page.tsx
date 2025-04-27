"use client"
import { Heading } from "@/components/common/heading"

export default function LobbyPage() {
  return (
    <div className="w-full flex justify-between items-start gap-10">
      <section>
        <Heading as="h2">Libros más votados</Heading>
      </section>

      <section>
        <Heading as="h2">Tus votos</Heading>
      </section>
    </div>
  )
}
