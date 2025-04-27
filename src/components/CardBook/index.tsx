import Image, { StaticImageData } from "next/image";
import { CiStar } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

import { useState } from "react";
interface CardBookProps {
  title: string;
  srcImage: string | StaticImageData;
  stars: number;
}

export function CardBook({ title, srcImage, stars }: CardBookProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const renderStars = (count: number) =>
    Array.from({ length: count }, (_, i) => <CiStar key={i} size={20} />);

  return (
    <article
      className="max-w-[200px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative max-h-[250px] rounded-lg overflow-hidden cursor-pointer">
        <Image
          src={srcImage}
          alt={title}
          className={`object-cover w-full h-full transition-opacity duration-200 ${
            isHovered ? "opacity-10" : "opacity-100"
          }`}
        />

        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer hover:rotate-180">
          <FaPlus />
        </button>
      </div>
      <h3 className="mt-2">{title}</h3>
      <div className=" flex">{renderStars(stars)}</div>
    </article>
  );
}
