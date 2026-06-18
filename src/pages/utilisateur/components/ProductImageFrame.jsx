const SIZE_CLASSES = {
  card: 'w-full h-52 min-h-52 max-h-52 shrink-0',
  square: 'aspect-square w-full min-h-0 shrink-0',
  thumb: 'w-28 h-28 min-h-28 max-h-28 shrink-0',
  cart: 'w-full md:w-32 h-32 min-h-32 max-h-32 shrink-0',
  gallery: 'aspect-square w-full min-h-0 shrink-0',
  category: 'h-32 min-h-32 max-h-32 w-full shrink-0',
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
      className={`relative flex items-center justify-center overflow-hidden bg-gray-50
                  ${border ? 'border-b border-gray-100' : ''}
                  ${sizeClass} ${className}`}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-contain p-4 ${imgClassName}`}
        />
      )}
      {children}
    </div>
  )
}
