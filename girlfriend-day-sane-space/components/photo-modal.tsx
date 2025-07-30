"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Heart, Download, Share, Upload } from "lucide-react"

interface PhotoModalProps {
  photo: any
  isOpen: boolean
  onClose: () => void
  onChangePhoto?: (photoId: number) => void
  canChangePhoto?: boolean
}

export default function PhotoModal({ photo, isOpen, onClose, onChangePhoto, canChangePhoto = false }: PhotoModalProps) {
  if (!isOpen || !photo) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white">
        <CardContent className="p-0">
          {/* Header with prominent Exit button */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 font-typewriter">Memory Details</h3>
            <div className="flex gap-2">
              {canChangePhoto && onChangePhoto && (
                <Button
                  onClick={() => onChangePhoto(photo.id)}
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              )}
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
              >
                <X className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>

          {/* Photo */}
          <div className="p-6">
            <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
              <img src={photo.src || "/placeholder.svg"} alt={photo.caption} className="w-full h-full object-cover" />
            </div>

            {/* Caption and Date */}
            <div className="text-center mt-6 space-y-2">
              <h4 className="text-xl font-semibold text-gray-800 font-typewriter">{photo.caption}</h4>
              <p className="text-gray-600 font-typewriter">{photo.date}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
                <Heart className="w-4 h-4 mr-2" />
                Love This
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
