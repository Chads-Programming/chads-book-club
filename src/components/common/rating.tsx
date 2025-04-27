import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6" // Importamos FaStarHalfAlt

const MAX_RATING = 5
type RatingProps = {
  stars: number
  maxStars?: number
}

export const Rating = ({ stars, maxStars = MAX_RATING }: RatingProps) => {
  const fullStars = Math.floor(stars)
  const hasHalfStar = stars % 1 !== 0
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex justify-start items-start text-primary">
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar color="gold" key={`route-rating-${stars}-full-star-${i}`} size={18} />
      ))}

      {hasHalfStar && <FaStarHalfStroke color="gold" key={`route-rating-${stars}-half-star`} size={18} />}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar color="gold" key={`route-rating-${stars}-empty-star-${i}`} size={18} />
      ))}
    </div>
  )
}
