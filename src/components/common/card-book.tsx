"use client"

import Image, { type StaticImageData } from "next/image"
import { FaPlus } from "react-icons/fa6"

import { Rating } from "./rating"
import { Heading } from "./heading"
interface CardBookProps {
  title: string
  srcImage: string | StaticImageData
  stars: number
}

export function CardBook({ title, srcImage, stars }: CardBookProps) {

  return (
    <article className="w-full max-w-[200px] flex flex-col gap-1">
      <div className="relative max-h-[250px] rounded-lg overflow-hidden cursor-pointer">
        <Image
          src={srcImage}
          alt={title}
          width={400}
          height={300}
          className={"object-cover w-full h-full transition-opacity duration-200 opacity-100 hover:opacity-75"}
        />

        <button
          type="button"
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer hover:rotate-180">
          <FaPlus />
        </button>
      </div>
      <Heading size="xs" className="mt-2">{title}</Heading>
      <Rating stars={stars} />
    </article>
  )
}
