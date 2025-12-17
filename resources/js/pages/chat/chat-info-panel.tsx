import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Pencil, Check, Calendar, Users, Info } from "lucide-react"
import type { Conversation } from "./types"

interface ChatInfoPanelProps {
  conversation: Conversation
  isOpen: boolean
  onClose: () => void
  onUpdateConversation: (updates: Partial<Conversation>) => void
}

export function ChatInfoPanel({ conversation, isOpen, onClose, onUpdateConversation }: ChatInfoPanelProps) {
  const [editingName, setEditingName] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [name, setName] = useState(conversation.name)
  const [description, setDescription] = useState(conversation.description)

  const handleSaveName = () => {
    onUpdateConversation({ name })
    setEditingName(false)
  }

  const handleSaveDescription = () => {
    onUpdateConversation({ description })
    setEditingDescription(false)
  }

  const onlineCount = conversation.members.filter((u) => u.status === "online").length

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Chat Info</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-65px)] p-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{conversation.name[0]}</AvatarFallback>
            </Avatar>

            {/* Editable Name */}
            <div className="flex items-center gap-2 w-full justify-center">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary border border-border rounded-lg px-3 py-2 text-center text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h3 className="text-xl font-semibold text-foreground">{conversation.name}</h3>
                  <button
                    onClick={() => setEditingName(true)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
                  >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              {conversation.isGroup
                ? `${conversation.members.length} members, ${onlineCount} online`
                : conversation.members[1]?.status === "online"
                  ? "online"
                  : "last seen recently"}
            </p>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Description</span>
            </div>
            {editingDescription ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                  autoFocus
                />
                <button
                  onClick={handleSaveDescription}
                  className="self-end px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className="group bg-secondary/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => setEditingDescription(true)}
              >
                <p className="text-foreground">{conversation.description || "Add a description..."}</p>
                <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to edit
                </p>
              </div>
            )}
          </div>

          {/* Creation Date */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Created</span>
            </div>
            <p className="text-foreground px-4">
              {conversation.createdAt.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Members Section */}
          {conversation.isGroup && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Members ({conversation.members.length})
                </span>
              </div>
              <div className="space-y-1">
                {conversation.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                          member.status === "online"
                            ? "bg-emerald-500"
                            : member.status === "away"
                              ? "bg-amber-500"
                              : "bg-zinc-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {member.name}
                        {member.id === "1" && <span className="text-xs text-muted-foreground ml-2">(You)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
