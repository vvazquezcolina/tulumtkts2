import { usePexelsImage } from "@/hooks/use-pexels-image";

interface BlogImageProps {
  pexelsQuery?: string;
  fallbackImage: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  fetchpriority?: "high" | "low" | "auto";
}

/**
 * Component that displays a blog post image, fetching from Pexels if available
 * Falls back to the provided fallback image if Pexels is unavailable
 * Optimized for SEO with proper alt text, dimensions, and loading attributes
 */
export function BlogImage({ 
  pexelsQuery, 
  fallbackImage, 
  alt, 
  className = "",
  loading = "lazy",
  width,
  height,
  fetchpriority
}: BlogImageProps) {
  const imageUrl = usePexelsImage(pexelsQuery, fallbackImage);

  return (
    <img 
      src={imageUrl} 
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      fetchPriority={fetchpriority}
      decoding="async"
    />
  );
}

