import { FaRegStar, FaStar } from "react-icons/fa6"

type RatingProps = {
  stars: number
  maxStars?: number
}

const MAX_RATING = 5

export const Rating = ({ stars, maxStars = MAX_RATING }: RatingProps) => {
  return (
    <div className="flex justify-start items-start text-primary">
      {Array.from({ length: stars }).map((_, i) => (
        <FaStar key={`route-rating-${stars}-stars-${i.toString()}`} size={24} />
      ))}

      {Array.from({ length: maxStars - stars }).map((_, i) => (
        <FaRegStar key={`route-rating-${stars}-empty-stars-${i.toString()}`} size={24} />
      ))}
    </div>
  )
}