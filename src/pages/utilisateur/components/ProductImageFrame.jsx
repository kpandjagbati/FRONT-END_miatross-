const SIZE_CLASSES = {
  card: 'h-52',
  square: 'aspect-square w-full',
  thumb: 'w-28 h-28 shrink-0',
  cart: 'w-full md:w-32 h-32 shrink-0',
  gallery: 'aspect-square w-full',
  category: 'h-32 w-full',
}

export default function ProductImageFrame({
  src,
  alt = '',
  size = 'card',
  className = '',
  imgClassName = '',
  border = true,
  children,
}) {
  const sizeClass = SIZE_CLASSES[size] ?? size

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-white
                  ${border ? 'border-b border-gray-100' : ''}
                  ${sizeClass} ${className}`}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className={`max-h-[88%] max-w-[92%] w-auto h-auto object-contain
                      ${imgClassName}`}
        />
      )}
      {children}
    </div>
  )
}
