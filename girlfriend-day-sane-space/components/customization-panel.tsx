"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit3, Save, X, Plus } from "lucide-react"

interface CustomizationPanelProps {
  isEditMode: boolean
  setIsEditMode: (mode: boolean) => void
  customMessages: any
  updateCustomMessage: (key: string, value: string) => void
  loveMessages: any[]
  updateLoveMessage: (index: number, field: "icon" | "message", value: string) => void
  customEmojis: any
  updateCustomEmoji: (index: number, value: string) => void
  customSongs: any[]
  updateCustomSong: (index: number, field: "title" | "artist" | "duration", value: string) => void
  addSongToPlaylist: () => void
  spotifyPlaylistUrl: string
  updateSpotifyPlaylist: (url: string) => void
  favoriteMemories: any[]
  updateMemory: (id: number, field: string, value: string) => void
}

export default function CustomizationPanel({
  isEditMode,
  setIsEditMode,
  customMessages,
  updateCustomMessage,
  loveMessages,
  updateLoveMessage,
  customEmojis,
  updateCustomEmoji,
  customSongs,
  updateCustomSong,
  addSongToPlaylist,
  spotifyPlaylistUrl,
  updateSpotifyPlaylist,
  favoriteMemories,
  updateMemory,
}: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState("messages")

  if (!isEditMode) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={() => setIsEditMode(true)} className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
          <Edit3 className="w-4 h-4 mr-2" />
          Customize
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Customize Your Sane Space</h2>
            <Button onClick={() => setIsEditMode(false)} variant="outline" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-6 py-3 font-medium ${
                activeTab === "messages"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab("love-boxes")}
              className={`px-6 py-3 font-medium ${
                activeTab === "love-boxes"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Love Boxes (12)
            </button>
            <button
              onClick={() => setActiveTab("emojis")}
              className={`px-6 py-3 font-medium ${
                activeTab === "emojis"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Emojis
            </button>
            <button
              onClick={() => setActiveTab("music")}
              className={`px-6 py-3 font-medium ${
                activeTab === "music"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Music
            </button>
            <button
              onClick={() => setActiveTab("memories")}
              className={`px-6 py-3 font-medium ${
                activeTab === "memories"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Memories (6)
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-6 py-3 font-medium ${
                activeTab === "photos"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Photos
            </button>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Greeting (To:)</label>
                  <input
                    type="text"
                    value={customMessages.greeting}
                    onChange={(e) => updateCustomMessage("greeting", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Message</label>
                  <input
                    type="text"
                    value={customMessages.fromMessage}
                    onChange={(e) => updateCustomMessage("fromMessage", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Message</label>
                  <textarea
                    value={customMessages.mainMessage}
                    onChange={(e) => updateCustomMessage("mainMessage", e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Second Message</label>
                  <textarea
                    value={customMessages.secondMessage}
                    onChange={(e) => updateCustomMessage("secondMessage", e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
                  <input
                    type="text"
                    value={customMessages.signature}
                    onChange={(e) => updateCustomMessage("signature", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === "love-boxes" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">12 Interactive Love Messages</h3>
                <div className="grid gap-4">
                  {loveMessages.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => updateLoveMessage(index, "icon", e.target.value)}
                        className="w-16 p-2 text-center border border-gray-300 rounded"
                        placeholder="💚"
                      />
                      <input
                        type="text"
                        value={item.message}
                        onChange={(e) => updateLoveMessage(index, "message", e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded"
                        placeholder="Your love message..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "emojis" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Drag & Drop Stickers</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Customize your sticker collection. Users can drag these onto the page!
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {customEmojis.decorative.map((emoji: string, index: number) => (
                      <div key={index} className="relative">
                        <input
                          type="text"
                          value={emoji}
                          onChange={(e) => updateCustomEmoji(index, e.target.value)}
                          className="w-12 h-12 text-center text-xl border border-gray-300 rounded bg-white"
                          maxLength={2}
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">D</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">💡 The "D" indicates these are draggable stickers</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">How Drag & Drop Works:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Users can drag stickers from the collection</li>
                    <li>• Drop them anywhere on the page to decorate</li>
                    <li>• Click dropped stickers to remove them</li>
                    <li>• Stickers rotate randomly when dropped</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "music" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spotify Playlist URL</label>
                  <input
                    type="text"
                    value={spotifyPlaylistUrl}
                    onChange={(e) => updateSpotifyPlaylist(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="https://open.spotify.com/embed/playlist/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Go to Spotify, find your playlist, click Share → Embed playlist, and paste the URL here
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Custom Songs</h3>
                    <Button onClick={addSongToPlaylist} className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Song
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {customSongs.map((song, index) => (
                      <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Song Title</label>
                            <input
                              type="text"
                              value={song.title}
                              onChange={(e) => updateCustomSong(index, "title", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Song title..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Artist</label>
                            <input
                              type="text"
                              value={song.artist}
                              onChange={(e) => updateCustomSong(index, "artist", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Artist name..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Duration</label>
                            <input
                              type="text"
                              value={song.duration}
                              onChange={(e) => updateCustomSong(index, "duration", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="0:00"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "memories" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">6 Favorite Moments</h3>
                <div className="grid grid-cols-2 gap-4">
                  {favoriteMemories.map((memory) => (
                    <div key={memory.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={memory.src || "/placeholder.svg"}
                          alt={memory.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={memory.caption}
                        onChange={(e) => updateMemory(memory.id, "caption", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Memory caption..."
                      />
                      <input
                        type="text"
                        value={memory.date}
                        onChange={(e) => updateMemory(memory.id, "date", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Date..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "photos" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Photo Upload System</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">How Photo Upload Works:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Click "Add Photos" to upload multiple images</li>
                      <li>• Photos appear in a dedicated gallery section</li>
                      <li>• Click any photo to view it in full size</li>
                      <li>• Remove photos with the X button</li>
                      <li>• Supports JPG, PNG, and other image formats</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Photo Tips:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Upload your favorite couple photos</li>
                    <li>• Photos are displayed in a scrapbook style</li>
                    <li>• Each photo gets a slight rotation for authenticity</li>
                    <li>• Photos are stored locally in your browser</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsEditMode(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setIsEditMode(false)} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
