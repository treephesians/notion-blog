import Image from "next/image";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CoverImage = ({ src, alt, className = "" }: CoverImageProps) => {
  return (
    <div
      className={`relative aspect-[18/9] w-full rounded-2xl overflow-hidden mb-8 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
        className="object-cover"
      />
    </div>
  );
};

export default CoverImage;
