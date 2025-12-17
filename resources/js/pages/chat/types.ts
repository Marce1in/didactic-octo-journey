export interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
}

export interface Attachment {
  id: string
  type: "image" | "file"
  name: string
  url: string
  size: string
}

export interface Message {
  id: string
  userId: string
  content?: string
  timestamp: Date
  attachments?: Attachment[]
}

export interface Conversation {
  id: string
  name: string
  description: string
  createdAt: Date
  isGroup: boolean
  avatar: string
  members: User[]
}
