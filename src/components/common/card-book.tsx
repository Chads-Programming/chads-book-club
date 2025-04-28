"use client"

import Image, { type StaticImageData } from "next/image"

import { Rating } from "./rating"
import { Heading } from "./heading"
import { Paragraph } from "./paragraph"
import { SubmissionService } from "@/services/submission"
import { toast } from "sonner"
import { BookActionButton } from "../book-action-button"
import { FaHeart, FaPlus } from "react-icons/fa6"
import { cn } from "@/lib/utils"

type CardBookVoteProps = {
  stars?: never
  votations: number
  liked?: boolean
}

type CardBookSubmitProps = {
  stars: number
  votations?: never
  handleActionTrigger?: never
  liked?: never
}

type CardBookProps = {
  title: string
  srcImage: string | StaticImageData
  authors: string[]
  id: string
  handleActionTrigger?: any
  small?: boolean
} & (CardBookVoteProps | CardBookSubmitProps)

export function CardBook({
  title,
  srcImage,
  stars,
  votations,
  authors,
  handleActionTrigger,
  liked,
  small,
  id,
}: CardBookProps) {
  const submitBook = async () => {
    toast.promise(SubmissionService.submitBook(id), {
      loading: "Subiendo...",
      success: "Libro subido correctamente",
      error: (error) => error.message,
    })
  }

  return (
    <article className="max-w-xs w-full flex flex-col gap-1 border border-black/5 shadow-md shadow-black/5 rounded-lg overflow-hidden">
      <div className="relative cursor-pointer">
        <Image
          src={srcImage}
          alt={title}
          width={400}
          height={300}
          className={cn(
            "object-cover w-full h-80 transition-opacity duration-200 opacity-100 hover:opacity-75",
            small && "h-30",
          )}
        />

        {!!stars && <BookActionButton icon={FaPlus} handleConfirm={submitBook} />}
        {!!votations && liked ? (
          <BookActionButton
            icon={FaHeart}
            handleTriggered={handleActionTrigger}
            className={liked ? "text-red-500" : ""}
          />
        ) : null}
      </div>

      <section className="p-4 flex flex-col gap-2">
        <header className="flex flex-col">
          <Heading size="xs" className="mt-2">
            {title}
          </Heading>
          {authors?.length && (
            <Paragraph className="text-[#777] font-medium" size="xs">
              {authors.join(", ")}
            </Paragraph>
          )}
        </header>

        {stars && <Rating stars={stars} id={id} />}
      </section>
    </article>
  )
}
