"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface Photo {
  id: number
  src: string
  caption: string
  date: string
}

interface PolaroidGalleryProps {
  photos: Photo[]
  onPhotoClick: (photo: Photo) => void
}

export default function PolaroidGallery({ photos, onPhotoClick }: PolaroidGalleryProps) {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)

  return (
    <Card className="mb-12 bg-white border border-gray-200">
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-8">📸 Our Memory Gallery 💕</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative transform transition-all duration-200 cursor-pointer ${
                hoveredPhoto === photo.id ? "scale-105" : "hover:scale-105"
              }`}
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 4 - 2)}deg)`,
              }}
              onMouseEnter={() => setHoveredPhoto(photo.id)}
              onMouseLeave={() => setHoveredPhoto(null)}
              onClick={() => onPhotoClick(photo)}
            >
              {/* Minimal Polaroid Frame */}
              <div className="bg-white p-3 pb-12 shadow-md border border-gray-200 max-w-[260px]">
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-gray-100 rounded-sm">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption Area */}
                <div className="mt-3 text-center">
                  <p className="text-gray-700 font-typewriter text-base leading-tight">{photo.caption}</p>
                  <p className="text-gray-500 text-sm mt-1 font-typewriter">{photo.date}</p>
                </div>

                {/* Simple Tape Effect */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-yellow-100 opacity-80 rounded-sm"></div>
              </div>

              {/* Hover Heart */}
              {hoveredPhoto === photo.id && (
                <div className="absolute top-2 right-2 text-red-400">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 italic font-typewriter text-base">"Every picture tells our story 📖💕"</p>
        </div>
      </CardContent>
    </Card>
  )
}
