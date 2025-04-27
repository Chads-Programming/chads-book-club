import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6" // Importamos FaStarHalfAlt

const MAX_RATING = 5

type RatingProps = {
  stars: number
  maxStars?: number
  id?: string
}

export const Rating = ({ stars, maxStars = MAX_RATING, id }: RatingProps) => {
  const fullStars = Math.floor(stars)
  const hasHalfStar = stars % 1 !== 0
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex justify-start items-start text-primary">
      {stars > 0 &&
        Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`rating-${id}-${stars}-full-star`} size={18} />
        ))}

      {stars > 0 && hasHalfStar && <FaStarHalfStroke key={`rating-${id}-${stars}-half-star`} size={18} />}

      {Array.from({ length: stars === 0 ? maxStars : emptyStars }).map((_, i) => (
        <FaRegStar key={`rating-${id}-${stars}-empty-star`} size={18} />
      ))}
    </div>
  )
}
