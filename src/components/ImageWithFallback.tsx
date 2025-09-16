import React, { useState, useCallback, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  showErrorIcon?: boolean;
  errorMessage?: string;
  priority?: boolean; // For LCP optimization
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  showErrorIcon = true,
  errorMessage = "Image not available",
  className = "",
  alt = "",
  priority = false,
  loading,
  onError: onErrorProp,
  onLoad: onLoadProp,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset internal state when the src prop changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = useCallback(() => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  }, [fallbackSrc, imageSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-muted/30 ${className}`}>
        <div className="text-center p-4">
          {showErrorIcon && <ImageOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />}
          <p className="text-xs text-muted-foreground">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`animate-pulse bg-muted/50 ${className}`} />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={(e) => { handleError(); onErrorProp?.(e as unknown as React.SyntheticEvent<HTMLImageElement, Event>); }}
        onLoad={(e) => { handleLoad(); onLoadProp?.(e as unknown as React.SyntheticEvent<HTMLImageElement, Event>); }}
        loading={priority ? "eager" : loading || "lazy"}
        fetchPriority={priority ? "high" : undefined}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;