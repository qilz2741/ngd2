"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, X, Camera, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomizationPanel from "@/components/customization-panel"
import PhotoModal from "@/components/photo-modal"

export default function SaneSpacePage() {
  const [openBlocks, setOpenBlocks] = useState<number[]>([])
  const [showMainMessage, setShowMainMessage] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [customMessages, setCustomMessages] = useState({
    mainTitle: "NATIONAL GIRLFRIEND'S DAY",
    greeting: "To: the most beautiful GF ♡",
    fromMessage: "From: your loving BF ♡",
    mainMessage:
      "Happy National Girlfriend's Day! You are the best gf ever. Please know that you are so loved and always. Thank you for being by my side and making my life 10x awesome!",
    secondMessage: "I made you this little space you can explore 👀 I hope you like it!",
    signature: "Your bf 💚",
  })

  // 12 interactive love messages for section 02
  const [loveMessages, setLoveMessages] = useState([
    { icon: "💚", message: "You make every day shine ✨" },
    { icon: "🌿", message: "I love how you laugh at my jokes" },
    { icon: "💎", message: "You're my favorite person in the world" },
    { icon: "🍃", message: "Thank you for being so amazing" },
    { icon: "✨", message: "You make everything better" },
    { icon: "💗", message: "I'm so lucky to have you" },
    { icon: "🦋", message: "You inspire me every single day" },
    { icon: "🌱", message: "Your smile lights up my world" },
    { icon: "🌸", message: "You're the sweetest person I know" },
    { icon: "⭐", message: "You make me want to be better" },
    { icon: "🌺", message: "I love your kind heart" },
    { icon: "💫", message: "You're my everything" },
  ])

  // 6 favorite moments for section 03
  const [favoriteMemories, setFavoriteMemories] = useState([
    {
      id: 1,
      src: "/placeholder.svg?height=300&width=250&text=Our First Date",
      caption: "Our magical first date 💚",
      date: "Feb 14, 2024",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=300&width=250&text=Beach Vacation",
      caption: "Beach vibes with my love 🌊",
      date: "Jul 20, 2024",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=300&width=250&text=Cozy Night",
      caption: "Cozy movie nights 🍿",
      date: "Dec 15, 2024",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=300&width=250&text=Adventure Time",
      caption: "Adventures together ⛰️",
      date: "Sep 8, 2024",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=300&width=250&text=Silly Moments",
      caption: "Being silly together 😂",
      date: "Nov 3, 2024",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=300&width=250&text=Sunset Love",
      caption: "Watching sunsets 🌅",
      date: "Oct 12, 2024",
    },
  ])

  const [customEmojis, setCustomEmojis] = useState({
    decorative: ["🌿", "🍃", "💚", "🌱", "✨", "💕", "🦋", "⭐"],
  })

  const [customSongs, setCustomSongs] = useState([
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
    { title: "All of Me", artist: "John Legend", duration: "4:29" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
    { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" },
    { title: "Make You Feel My Love", artist: "Adele", duration: "3:32" },
  ])

  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0",
  )

  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  const [droppedStickers, setDroppedStickers] = useState<Array<{ id: string; emoji: string; x: number; y: number }>>([])

  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; src: string; name: string }>>([])

  // Add these new state variables after the existing state declarations
  const [changingPhotoId, setChangingPhotoId] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // New state for girlfriend photo
  const [girlfriendPhoto, setGirlfriendPhoto] = useState(
    "/placeholder.svg?height=240&width=180&text=Beautiful Girlfriend",
  )
  const girlfriendPhotoInputRef = useRef<HTMLInputElement>(null)

  // Pinterest stickers state
  const [showPinterestStickers, setShowPinterestStickers] = useState(false)
  const [pinterestStickers, setPinterestStickers] = useState([
    // Love & Hearts
    "💕",
    "💖",
    "💗",
    "💘",
    "💝",
    "💞",
    "💟",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    // Nature & Plants
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
    // Cute Animals
    "🦋",
    "🐝",
    "🐞",
    "🐛",
    "🦄",
    "🐰",
    "🐱",
    "🐶",
    "🐻",
    "🐼",
    "🐨",
    "🐸",
    "🐙",
    "🦊",
    "🦔",
    // Food & Treats
    "🍓",
    "🍒",
    "🍑",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🥝",
    "🍍",
    "🥥",
    "🍰",
    "🧁",
    "🍪",
    "🍩",
    "🍭",
    "🍬",
    // Decorative
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
    // Symbols & Shapes
    "💌",
    "📮",
    "📝",
    "📖",
    "📚",
    "🔖",
    "🏷️",
    "📎",
    "📌",
    "📍",
    "🗂️",
    "📋",
    "📄",
    "📃",
    "📑",
    "🗒️",
  ])

  // New state for external elements
  const [droppedElements, setDroppedElements] = useState<
    Array<{
      id: string
      type: "image" | "text" | "emoji"
      content: string
      x: number
      y: number
      width?: number
      height?: number
    }>
  >([])
  const [showDropZoneHelper, setShowDropZoneHelper] = useState(false)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            src: e.target?.result as string,
            name: file.name,
          }
          setUploadedPhotos((prev) => [...prev, newPhoto])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleGirlfriendPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setGirlfriendPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
    // Reset the input
    if (event.target) {
      event.target.value = ""
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setShowDropZoneHelper(false)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Handle emoji/sticker drops
    const emoji = e.dataTransfer.getData("text/plain")
    if (emoji && emoji.length <= 4) {
      // Likely an emoji
      const newSticker = {
        id: Date.now().toString(),
        emoji,
        x,
        y,
      }
      setDroppedStickers((prev) => [...prev, newSticker])
      return
    }

    // Handle external elements
    const files = e.dataTransfer.files
    const items = e.dataTransfer.items

    // Handle file drops (images)
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const content = event.target?.result as string
            if (content) {
              const newElement = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                type: "image" as const,
                content,
                x,
                y,
                width: 150,
                height: 150,
              }
              setDroppedElements((prev) => [...prev, newElement])
            }
          }
          reader.readAsDataURL(file)
        }
      })
      return
    }

    // Handle text/HTML drops
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.type === "text/html") {
          item.getAsString((html) => {
            // Extract images from HTML
            const imgMatch = html.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
            if (imgMatch && imgMatch[1]) {
              const newElement = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                type: "image" as const,
                content: imgMatch[1],
                x,
                y,
                width: 150,
                height: 150,
              }
              setDroppedElements((prev) => [...prev, newElement])
            }
          })
        } else if (item.type === "text/plain") {
          item.getAsString((text) => {
            // Check if it's a URL pointing to an image
            if (text && (text.match(/\.(jpg|jpeg|png|gif|webp)$/i) || text.startsWith("data:image/"))) {
              const newElement = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                type: "image" as const,
                content: text,
                x,
                y,
                width: 150,
                height: 150,
              }
              setDroppedElements((prev) => [...prev, newElement])
            } else if (text && text.length > 0 && text.length < 200) {
              // Handle text drops
              const newElement = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                type: "text" as const,
                content: text,
                x,
                y,
              }
              setDroppedElements((prev) => [...prev, newElement])
            }
          })
        }
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setShowDropZoneHelper(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only hide if we're leaving the main container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setShowDropZoneHelper(false)
    }
  }

  const removeSticker = (id: string) => {
    setDroppedStickers((prev) => prev.filter((sticker) => sticker.id !== id))
  }

  const removeElement = (id: string) => {
    setDroppedElements((prev) => prev.filter((element) => element.id !== id))
  }

  const toggleBlock = (index: number) => {
    setOpenBlocks((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % customSongs.length)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + customSongs.length) % customSongs.length)
  }

  const updateCustomMessage = (key: string, value: string) => {
    setCustomMessages((prev) => ({ ...prev, [key]: value }))
  }

  const updateLoveMessage = (index: number, field: "icon" | "message", value: string) => {
    setLoveMessages((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const updateCustomEmoji = (index: number, value: string) => {
    setCustomEmojis((prev) => ({
      decorative: prev.decorative.map((emoji, i) => (i === index ? value : emoji)),
    }))
  }

  const updateCustomSong = (index: number, field: "title" | "artist" | "duration", value: string) => {
    setCustomSongs((prev) => prev.map((song, i) => (i === index ? { ...song, [field]: value } : song)))
  }

  const addSongToPlaylist = () => {
    const newSong = {
      title: "New Song",
      artist: "Artist Name",
      duration: "0:00",
    }
    setCustomSongs((prev) => [...prev, newSong])
  }

  const updateSpotifyPlaylist = (url: string) => {
    setSpotifyPlaylistUrl(url)
  }

  const updateMemory = (id: number, field: string, value: string) => {
    setFavoriteMemories((prev) => prev.map((memory) => (memory.id === id ? { ...memory, [field]: value } : memory)))
  }

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo)
    setShowPhotoModal(true)
  }

  const handleChangePhoto = (photoId: number) => {
    setChangingPhotoId(photoId)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0] && changingPhotoId !== null) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const newSrc = e.target?.result as string
        setFavoriteMemories((prev) =>
          prev.map((memory) =>
            memory.id === changingPhotoId ? { ...memory, src: newSrc, caption: `Updated: ${memory.caption}` } : memory,
          ),
        )
        setChangingPhotoId(null)
        setShowPhotoModal(false)
      }
      reader.readAsDataURL(file)
    }
    // Reset the input
    if (event.target) {
      event.target.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-moody-sage bg-paper-texture p-4 overflow-hidden">
      <div
        className="max-w-6xl mx-auto relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Drop Zone Helper */}
        {showDropZoneHelper && (
          <div className="fixed inset-0 bg-blue-500/20 border-4 border-dashed border-blue-500 z-40 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 p-6 rounded-lg shadow-lg text-center">
              <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-typewriter">Drop Here!</h3>
              <p className="text-gray-600 font-typewriter">Drop images, text, or elements from the web</p>
            </div>
          </div>
        )}

        {/* Header Notice */}
        <div className="absolute top-8 left-8 bg-white/90 p-4 rounded-lg shadow-sm border border-gray-200 max-w-xs z-10 paper-card">
          <div className="text-xs font-medium text-gray-600 mb-2">📌 NOTICE</div>
          <div className="text-sm text-gray-700 mb-1">{customMessages.greeting}</div>
          <div className="text-sm text-gray-700">{customMessages.fromMessage}</div>
        </div>

        {/* Share Button */}
        <div className="absolute top-8 right-8 z-10">
          <Button variant="outline" className="bg-white/90 border-gray-200 text-gray-600 text-sm paper-card">
            Share
          </Button>
        </div>

        {/* Drag & Drop Instructions */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-blue-50 p-3 rounded-lg shadow-sm border border-blue-200 z-10">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <p className="text-xs text-blue-800 font-typewriter">Drag images & text from any website here!</p>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center pt-20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-typewriter-bold drop-shadow-lg">
            {customMessages.mainTitle}
          </h1>
        </div>

        {/* Section 01 - Start Here */}
        <Card className="mb-16 bg-white/95 border border-gray-200 shadow-lg paper-card">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-typewriter-bold">01 — Start here!</h2>
              <Button
                onClick={() => setShowMainMessage(!showMainMessage)}
                className="bg-pink-100 hover:bg-pink-200 text-pink-800 border border-pink-200 rounded-full px-6 mb-6"
              >
                📖 Read me ♡
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Her Picture with Upload */}
              <div className="text-center">
                <div className="relative inline-block group">
                  <div className="w-48 h-60 bg-white p-3 rounded-lg shadow-md border border-gray-200 paper-card">
                    <img
                      src={girlfriendPhoto || "/placeholder.svg?height=240&width=180&text=Beautiful Girlfriend"}
                      alt="Beautiful girlfriend"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Upload Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <Button
                      onClick={() => girlfriendPhotoInputRef.current?.click()}
                      className="bg-white/90 hover:bg-white text-gray-800 border border-gray-200"
                      size="sm"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>

                  {/* Hidden file input for girlfriend photo */}
                  <input
                    ref={girlfriendPhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleGirlfriendPhotoUpload}
                    className="hidden"
                  />

                  {/* Decorative elements around photo */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-600" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center">
                    ✨
                  </div>
                </div>

                {/* Upload instruction */}
                <p className="text-xs text-gray-500 mt-2 font-typewriter">Hover to change photo</p>

                {/* Main Message */}
                {showMainMessage && (
                  <div className="mt-6 bg-green-50 p-6 rounded-lg border border-green-100 paper-card">
                    <p className="text-gray-700 leading-relaxed mb-4 font-typewriter">{customMessages.mainMessage}</p>
                    <p className="text-gray-700 mb-4 font-typewriter">{customMessages.secondMessage}</p>
                    <p className="text-right text-green-600 font-medium font-typewriter">
                      Love, <br />
                      {customMessages.signature}
                    </p>
                  </div>
                )}
              </div>

              {/* Music Player */}
              <div className="bg-gray-50 p-6 rounded-lg paper-card">
                <h3 className="text-lg font-semibold text-center text-gray-800 mb-4 flex items-center justify-center gap-2 font-typewriter-bold">
                  <Volume2 className="w-5 h-5" />
                  Our Love Playlist 🎵
                </h3>

                {/* Spotify Embed */}
                <div className="mb-4">
                  <iframe
                    src={spotifyPlaylistUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded"
                  ></iframe>
                </div>

                {/* Custom Player */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800 mb-1">
                    {customSongs[currentSong]?.title || "Perfect"}
                  </div>
                  <div className="text-xs text-gray-600 mb-3">{customSongs[currentSong]?.artist || "Ed Sheeran"}</div>

                  <div className="flex justify-center items-center gap-3 mb-3">
                    <Button onClick={prevSong} variant="outline" size="sm" className="rounded-full bg-transparent">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button onClick={togglePlay} className="rounded-full bg-green-600 hover:bg-green-700 w-10 h-10 p-0">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button onClick={nextSong} variant="outline" size="sm" className="rounded-full bg-transparent">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button onClick={() => setShowPlaylist(!showPlaylist)} variant="outline" size="sm">
                    {showPlaylist ? "Hide Songs" : "Show All Songs"}
                  </Button>

                  {showPlaylist && (
                    <div className="mt-3 space-y-1 text-left">
                      {customSongs.map((song, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentSong(index)}
                          className={`p-2 rounded cursor-pointer text-xs ${
                            index === currentSong ? "bg-green-100" : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="font-medium">{song.title}</div>
                          <div className="text-gray-600">{song.artist}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Pinterest-Style Stickers */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 font-typewriter-bold">Drag & Drop Stickers</h3>

                <div className="grid grid-cols-4 gap-3">
                  {customEmojis.decorative.map((emoji, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", emoji)
                        e.dataTransfer.effectAllowed = "copy"
                      }}
                      className="w-12 h-12 bg-white rounded-lg border-2 border-pink-200 flex items-center justify-center cursor-grab hover:cursor-grabbing hover:bg-pink-50 transition-colors paper-card active:scale-95"
                      style={{ transform: `rotate(${(index % 2 === 0 ? 1 : -1) * 3}deg)` }}
                    >
                      <span className="text-xl select-none">{emoji}</span>
                    </div>
                  ))}
                </div>

                {/* Drop Zone Instructions */}
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-xs text-yellow-800 font-typewriter mb-1">💡 Drag stickers to decorate your page</p>
                  <p className="text-xs text-blue-800 font-typewriter">🌐 Or drag images & text from any website!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 - Things I Love About You */}
        <Card className="mb-16 bg-white/95 border border-gray-200 shadow-lg paper-card">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-typewriter-bold">
                02 — Things I love about you ♡
              </h2>
              <p className="text-gray-600 font-typewriter">Click each box to reveal a special message!</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loveMessages.map((item, index) => (
                <div
                  key={index}
                  onClick={() => toggleBlock(index)}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 paper-card"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 2)}deg)`,
                    backgroundColor: [
                      "#fef7f7", // light pink
                      "#f0fdf4", // light green
                      "#fefce8", // light yellow
                      "#f0f9ff", // light blue
                      "#faf5ff", // light purple
                      "#fff7ed", // light orange
                    ][index % 6],
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm text-gray-700 font-typewriter leading-tight">
                      {openBlocks.includes(index) ? item.message : "Tap to open! 💚"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 03 - Favorite Moments Together */}
        <Card className="mb-16 bg-white/95 border border-gray-200 shadow-lg paper-card">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-typewriter-bold">
                03 — Favorite moments together 📸
              </h2>
              <p className="text-gray-600 font-typewriter">Our beautiful memories captured in time</p>

              {/* Add Photos Button */}
              <div className="mt-4">
                <input
                  type="file"
                  id="memory-photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {/* Hidden file input for changing photos */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label
                  htmlFor="memory-photos"
                  className="inline-flex items-center justify-center px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 border border-pink-200 rounded-lg cursor-pointer transition-colors font-typewriter"
                >
                  📷 Add Your Photos
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Default Memories */}
              {favoriteMemories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="relative cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3)}deg)`,
                  }}
                  onClick={() => openPhotoModal({ ...memory, id: memory.id })}
                >
                  {/* Polaroid Frame */}
                  <div className="bg-white p-3 pb-12 shadow-md border border-gray-200 max-w-[280px] mx-auto paper-card">
                    {/* Photo */}
                    <div className="aspect-square overflow-hidden bg-gray-100 rounded-sm">
                      <img
                        src={memory.src || "/placeholder.svg?height=300&width=250&text=Memory"}
                        alt={memory.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Caption Area */}
                    <div className="mt-3 text-center">
                      <p className="text-gray-700 font-typewriter text-sm leading-tight">{memory.caption}</p>
                      <p className="text-gray-500 text-xs mt-1 font-typewriter">{memory.date}</p>
                    </div>

                    {/* Tape Effect */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-yellow-100 opacity-80 rounded-sm"></div>
                  </div>

                  {/* Hover Heart */}
                  <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Heart className="w-5 h-5 text-red-400 fill-current" />
                  </div>
                </div>
              ))}

              {/* Uploaded Photos */}
              {uploadedPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  style={{
                    transform: `rotate(${((favoriteMemories.length + index) % 2 === 0 ? 1 : -1) * (Math.random() * 3)}deg)`,
                  }}
                  onClick={() =>
                    openPhotoModal({
                      src: photo.src,
                      caption: photo.name.replace(/\.[^/.]+$/, ""),
                      date: "Your uploaded photo",
                      id: null, // Uploaded photos can't be changed, only removed
                    })
                  }
                >
                  {/* Polaroid Frame */}
                  <div className="bg-white p-3 pb-12 shadow-md border border-gray-200 max-w-[280px] mx-auto paper-card">
                    {/* Photo */}
                    <div className="aspect-square overflow-hidden bg-gray-100 rounded-sm">
                      <img
                        src={photo.src || "/placeholder.svg?height=300&width=250&text=Photo"}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Caption Area */}
                    <div className="mt-3 text-center">
                      <p className="text-gray-700 font-typewriter text-sm leading-tight">
                        {photo.name.replace(/\.[^/.]+$/, "")}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 font-typewriter">Your photo</p>
                    </div>

                    {/* Tape Effect */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-yellow-100 opacity-80 rounded-sm"></div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setUploadedPhotos((prev) => prev.filter((p) => p.id !== photo.id))
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors z-10 flex items-center justify-center"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* Hover Heart */}
                  <div className="absolute top-2 left-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-red-400 fill-current" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-white font-typewriter text-lg">"I Love you more"</p>
          <div className="flex justify-center gap-3 text-2xl mt-4">
            {customEmojis.decorative.slice(0, 5).map((emoji, index) => (
              <span
                key={index}
                className="transform hover:scale-110 transition-transform"
                style={{ rotate: `${(index % 2 === 0 ? 1 : -1) * 5}deg` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Dropped Stickers */}
        {droppedStickers.map((sticker) => (
          <div
            key={sticker.id}
            className="absolute pointer-events-auto cursor-pointer hover:scale-110 transition-transform z-20"
            style={{
              left: sticker.x,
              top: sticker.y,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
            onClick={() => removeSticker(sticker.id)}
            title="Click to remove"
          >
            <span className="text-2xl drop-shadow-sm">{sticker.emoji}</span>
          </div>
        ))}

        {/* Dropped External Elements */}
        {droppedElements.map((element) => (
          <div
            key={element.id}
            className="absolute pointer-events-auto cursor-pointer hover:scale-105 transition-transform z-20 group"
            style={{
              left: element.x,
              top: element.y,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
            onClick={() => removeElement(element.id)}
            title="Click to remove"
          >
            {element.type === "image" && element.content && (
              <div className="relative">
                <img
                  src={element.content || "/placeholder.svg"}
                  alt="Dropped element"
                  className="rounded-lg shadow-lg border-2 border-white"
                  style={{
                    width: element.width || 150,
                    height: element.height || 150,
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Handle broken images
                    e.currentTarget.style.display = "none"
                  }}
                />
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {element.type === "text" && (
              <div className="relative bg-white/90 p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs">
                <p className="text-sm text-gray-800 font-typewriter">{element.content}</p>
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Customization Panel */}
      <CustomizationPanel
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        customMessages={customMessages}
        updateCustomMessage={updateCustomMessage}
        loveMessages={loveMessages}
        updateLoveMessage={updateLoveMessage}
        customEmojis={customEmojis}
        updateCustomEmoji={updateCustomEmoji}
        customSongs={customSongs}
        updateCustomSong={updateCustomSong}
        addSongToPlaylist={addSongToPlaylist}
        spotifyPlaylistUrl={spotifyPlaylistUrl}
        updateSpotifyPlaylist={updateSpotifyPlaylist}
        favoriteMemories={favoriteMemories}
        updateMemory={updateMemory}
      />

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onChangePhoto={handleChangePhoto}
        canChangePhoto={selectedPhoto?.id && selectedPhoto.id <= 6} // Only allow changing default photos
      />
    </div>
  )
}
