
// This is a placeholder for the next/image component.
// In a real Next.js app, you would import Image from 'next/image'.
// For the purpose of this prototyping environment, we'll use a simple img tag.

import type {ImgHTMLAttributes} from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  priority?: boolean;
  // data-ai-hint is a custom attribute we use
  'data-ai-hint'?: string;
}

// eslint-disable-next-line @next/next/no-img-element
const Image = ({ src, alt, fill, objectFit, style, ...props }: ImageProps) => {
  const imageStyles: React.CSSProperties = { ...style };
  if (fill) {
    imageStyles.position = 'absolute';
    imageStyles.height = '100%';
    imageStyles.width = '100%';
    imageStyles.left = '0';
    imageStyles.top = '0';
    imageStyles.right = '0';
    imageStyles.bottom = '0';
    if (objectFit) {
      imageStyles.objectFit = objectFit;
    }
  }

  return <img src={src} alt={alt} style={imageStyles} {...props} />;
};

export default Image;
