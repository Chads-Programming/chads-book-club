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
import { useEffect, useState } from "react"
import { type UserResponse, UserService } from "@/services/user"
import { DEFAULT_DISCORD_AVATAR } from "@/constants"

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

type CardBookProps = React.ComponentProps<"article"> & {
  title: string
  srcImage: string | StaticImageData
  authors: string[]
  id: string
  handleActionTrigger?: any
  small?: boolean
  creatorUser?: string
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
  creatorUser,
  className,
  ...props
}: CardBookProps) {
  const [creator, setCreator] = useState<UserResponse>()

  const submitBook = async () => {
    toast.promise(SubmissionService.submitBook(id), {
      loading: "Subiendo...",
      success: "Libro subido correctamente",
      error: (error) => error.message,
    })
  }

  useEffect(() => {
    if (!creatorUser) return

    const getUser = async () => {
      const user = (await UserService.findOne(creatorUser))?.data
      if (!user) return
      setCreator(user)
    }
    getUser()
  }, [creatorUser])

  console.log({ creator })

  return (
    <article
      className={cn(
        "max-w-xs w-full flex flex-col gap-1 border border-black/5 shadow-md shadow-black/5 rounded-lg overflow-hidden",
        className,
      )}
      {...props}>
      <div className="relative">
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

        <BookActionButton
          {...(handleActionTrigger
            ? {
                handleTriggered: handleActionTrigger,
                icon: FaHeart,
                className: liked ? "text-red-500" : "",
              }
            : {
                handleConfirm: submitBook,
                icon: FaPlus,
              })}
        />
      </div>

      <section className="p-4 flex flex-col gap-4">
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

        {creator && (
          <div className="flex flex-col items-start gap-1">
            <Paragraph size="xs" as="span">
              Subido por:{" "}
            </Paragraph>

            <div className="flex justify-start items-center gap-2">
              {creator.avatarUrl && (
                <img
                  src={creator.avatarUrl.includes("null") ? DEFAULT_DISCORD_AVATAR : creator.avatarUrl}
                  alt={creator.username}
                  className="w-8 h-8 object-cover rounded-full"
                />
              )}
              <Paragraph size="xs" as="span">
                {creator.username}
              </Paragraph>
            </div>
          </div>
        )}
      </section>
    </article>
  )
}
