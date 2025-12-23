
import { useState } from "react"
import { ZoomIn } from "lucide-react"

const ImageGallery = ({ images, selectedImage, onImageSelect, productTitle }) =>{
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div className="flex gap-4 sticky top-30">
      <div className="flex flex-col gap-2 w-20">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(image)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === image ? "border-amber-300 shadow-md" : "border-gray-200 hover:border-gray-200"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productTitle} view ${index + 1}`}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <div
          className="relative aspect-square rounded-[4px] overflow-hidden bg-white cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={selectedImage || "/placeholder.svg"}
            alt={productTitle}
            className="object-cover transition-transform duration-300"
            style={{
              transform: isZoomed ? "scale(2)" : "scale(1)",
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>

        {/* Magnifier Glass Effect */}
        {isZoomed && (
          <div
            className="absolute w-32 h-32 border-2 border-primary rounded-full pointer-events-none bg-white shadow-lg overflow-hidden"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: "translate(-50%, -50%)",
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "400% 400%",
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ImageGallery