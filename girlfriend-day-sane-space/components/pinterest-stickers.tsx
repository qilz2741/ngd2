"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"

interface PinterestStickersProps {
  isOpen: boolean
  onClose: () => void
}

export default function PinterestStickers({ isOpen, onClose }: PinterestStickersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const stickerCategories = {
    all: "All Stickers",
    love: "Love & Hearts",
    nature: "Nature & Plants",
    animals: "Cute Animals",
    food: "Food & Treats",
    decorative: "Decorative",
    symbols: "Symbols & Shapes",
  }

  const stickers = {
    love: ["💕", "💖", "💗", "💘", "💝", "💞", "💟", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎"],
    nature: [
      "🌸",
      "🌺",
      "🌻",
      "🌷",
      "🌹",
      "🌿",
      "🍃",
      "🌱",
      "🌳",
      "🌲",
      "🌴",
      "🌵",
      "🌾",
      "🌼",
      "🌙",
      "⭐",
      "✨",
      "🌟",
      "💫",
    ],
    animals: ["🦋", "🐝", "🐞", "🐛", "🦄", "🐰", "🐱", "🐶", "🐻", "🐼", "🐨", "🐸", "🐙", "🦊", "🦔"],
    food: ["🍓", "🍒", "🍑", "🍊", "🍋", "🍌", "🍉", "🍇", "🥝", "🍍", "🥥", "🍰", "🧁", "🍪", "🍩", "🍭", "🍬"],
    decorative: [
      "🎀",
      "🎁",
      "🎈",
      "🎉",
      "🎊",
      "🎂",
      "🕯️",
      "💎",
      "👑",
      "🌈",
      "☁️",
      "⚡",
      "🔥",
      "💧",
      "❄️",
      "🎵",
      "🎶",
      "🎼",
    ],
    symbols: ["💌", "📮", "📝", "📖", "📚", "🔖", "🏷️", "📎", "📌", "📍", "🗂️", "📋", "📄", "📃", "📑", "🗒️"],
  }

  const getAllStickers = () => {
    return Object.values(stickers).flat()
  }

  const getFilteredStickers = () => {
    const categoryStickers =
      selectedCategory === "all" ? getAllStickers() : stickers[selectedCategory as keyof typeof stickers] || []

    if (!searchTerm) return categoryStickers

    // Simple search - you could enhance this with better matching
    return categoryStickers.filter(
      (sticker) =>
        sticker.includes(searchTerm) || getCategoryForSticker(sticker).toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const getCategoryForSticker = (sticker: string) => {
    for (const [category, stickerList] of Object.entries(stickers)) {
      if (stickerList.includes(sticker)) {
        return stickerCategories[category as keyof typeof stickerCategories]
      }
    }
    return "Other"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-red-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 font-typewriter">Pinterest Stickers</h2>
              <p className="text-sm text-gray-600 font-typewriter">Drag any sticker to your scrapbook</p>
            </div>
            <Button onClick={onClose} variant="outline" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search and Categories */}
          <div className="p-6 border-b bg-gray-50">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stickers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(stickerCategories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Stickers Grid */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-3">
              {getFilteredStickers().map((sticker, index) => (
                <div
                  key={`${sticker}-${index}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", sticker)
                    e.dataTransfer.effectAllowed = "copy"
                  }}
                  className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center cursor-grab hover:cursor-grabbing hover:bg-red-50 hover:border-red-200 transition-colors active:scale-95 shadow-sm"
                  title={`Drag ${sticker} to page`}
                >
                  <span className="text-lg select-none">{sticker}</span>
                </div>
              ))}
            </div>

            {getFilteredStickers().length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 font-typewriter">No stickers found matching your search.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 font-typewriter">{getFilteredStickers().length} stickers available</p>
              <Button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">
                Done
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
