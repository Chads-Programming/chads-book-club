"use client"

import Image, { type StaticImageData } from "next/image"

import { Rating } from "./rating"
import { Heading } from "./heading"
import { Paragraph } from "./paragraph"
import BookSubmitConfirm from "../book-submit-confirm"
import { SubmissionService } from "@/services/submission"
import { toast } from "sonner"

interface CardBookProps {
  title: string
  srcImage: string | StaticImageData
  stars: number
  authors: string[]
  id: string
}

export function CardBook({ title, srcImage, stars, authors, id }: CardBookProps) {
  const handleSubmit = async () => {
    toast.promise(SubmissionService.submitBook(id), {
      loading: "Submitting...",
      success: "Book submitted successfully",
      error: (error) => error.message,
    })
  }

  return (
    <article className="w-full max-w-[200px] flex flex-col gap-1">
      <div className="relative max-h-[250px] rounded-lg overflow-hidden cursor-pointer">
        <Image
          src={srcImage}
          alt={title}
          width={400}
          height={300}
          className={
            "object-cover w-full h-full transition-opacity duration-200 opacity-100 hover:opacity-75"
          }
        />

        <BookSubmitConfirm handleConfirm={handleSubmit} />
      </div>
      <Heading size="xs" className="mt-2">
        {title}
      </Heading>
      <Paragraph className="text-[#777]" size="xs">
        {authors.join(", ")}
      </Paragraph>
      <Rating stars={stars} id={id} />
    </article>
  )
}
