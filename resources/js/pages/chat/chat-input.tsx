import type React from "react"

import { useState, useRef } from "react"
import { Smile, Paperclip, Send, ImageIcon, FileText, X } from "lucide-react"
import type { Attachment } from "./types"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (content: string, attachments: Attachment[]) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments)
      setMessage("")
      setAttachments([])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    const files = e.target.files
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map((file, i) => ({
        id: `temp-${Date.now()}-${i}`,
        type,
        name: file.name,
        url: type === "image" ? URL.createObjectURL(file) : "#",
        size: formatFileSize(file.size),
      }))
      setAttachments([...attachments, ...newAttachments])
    }
    setShowAttachMenu(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id))
  }

  return (
    <div className="p-4 bg-card border-t border-border">
      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-xl bg-secondary">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative group">
              {attachment.type === "image" ? (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={attachment.url || "/placeholder.svg"}
                    alt={attachment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-xs truncate max-w-24">{attachment.name}</span>
                </div>
              )}
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="p-2.5 rounded-xl hover:bg-secondary transition-colors"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>

          {showAttachMenu && (
            <div className="absolute bottom-full left-0 mb-2 py-2 w-40 rounded-xl bg-popover border border-border shadow-xl">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-accent" />
                <span>Image</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>File</span>
              </button>
            </div>
          )}

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e, "image")}
          />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e, "file")}
          />
        </div>

        <button type="button" className="p-2.5 rounded-xl hover:bg-secondary transition-colors">
          <Smile className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex-1 flex items-end gap-2 px-4 py-2.5 rounded-2xl bg-secondary">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none focus:outline-none max-h-32 placeholder:text-muted-foreground"
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim() && attachments.length === 0}
          className={cn(
            "p-2.5 rounded-xl transition-all",
            message.trim() || attachments.length > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-muted-foreground",
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
