import { CiStar } from "react-icons/ci"

export function RenderStars({ count }: { count: number }) {
  return Array.from({ length: count }, (_, i) => <CiStar key={i} size={20} />)
}
