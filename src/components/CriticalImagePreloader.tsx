import { Helmet } from 'react-helmet-async';

interface CriticalImagePreloaderProps {
  images: {
    src: string;
    type?: string;
  }[];
}

const CriticalImagePreloader = ({ images }: CriticalImagePreloaderProps) => {
  return (
    <Helmet>
      {images.map((image, index) => (
        <link
          key={index}
          rel="preload"
          as="image"
          href={image.src}
          type={image.type || "image/jpeg"}
          crossOrigin="anonymous"
        />
      ))}
    </Helmet>
  );
};

export default CriticalImagePreloader;