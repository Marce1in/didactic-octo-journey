import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Download, FileText, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import type { Attachment, Message, User } from './types';

interface ChatMessagesProps {
    messages: Message[];
    users: User[];
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessages({
    messages,
    users,
    messagesEndRef,
}: ChatMessagesProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const getUser = (userId: string) => users.find((u) => u.id === userId);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    const renderAttachment = (attachment: Attachment) => {
        if (attachment.type === 'image') {
            return (
                <button
                    key={attachment.id}
                    onClick={() => setLightboxImage(attachment.url)}
                    className="hover:ring-primary/50 group relative max-w-xs overflow-hidden rounded-xl transition-all hover:ring-2"
                >
                    <img
                        src={attachment.url || '/placeholder.svg'}
                        alt={attachment.name}
                        className="h-auto max-h-64 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <Maximize2 className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="bg-linear-to-t absolute bottom-0 left-0 right-0 from-black/60 to-transparent px-3 py-2">
                        <p className="truncate text-xs text-white/90">
                            {attachment.name}
                        </p>
                        <p className="text-xs text-white/70">
                            {attachment.size}
                        </p>
                    </div>
                </button>
            );
        }

        return (
            <div
                key={attachment.id}
                className="bg-secondary hover:bg-secondary/80 flex max-w-xs items-center gap-3 rounded-xl p-3 transition-colors"
            >
                <div className="bg-primary/10 rounded-lg p-2">
                    <FileText className="text-primary h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                        {attachment.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                        {attachment.size}
                    </p>
                </div>
                <button className="hover:bg-background/50 rounded-lg p-2 transition-colors">
                    <Download className="text-muted-foreground h-4 w-4" />
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((message, index) => {
                    const user = getUser(message.userId);
                    const isCurrentUser = message.userId === '1';
                    const showAvatar =
                        index === 0 ||
                        messages[index - 1].userId !== message.userId;

                    return (
                        <div
                            key={message.id}
                            className={cn(
                                'flex gap-3',
                                isCurrentUser ? 'flex-row-reverse' : 'flex-row',
                            )}
                        >
                            {showAvatar ? (
                                <Avatar className="h-10 w-10 shrink-0">
                                    <AvatarImage
                                        src={user?.avatar || '/placeholder.svg'}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback>
                                        {user?.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className="w-10 shrink-0" />
                            )}

                            <div
                                className={cn(
                                    'flex max-w-lg flex-col',
                                    isCurrentUser ? 'items-end' : 'items-start',
                                )}
                            >
                                {showAvatar && (
                                    <div
                                        className={cn(
                                            'mb-1 flex items-center gap-2',
                                            isCurrentUser
                                                ? 'flex-row-reverse'
                                                : 'flex-row',
                                        )}
                                    >
                                        <span className="text-sm font-semibold">
                                            {user?.name}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                )}

                                {message.content && (
                                    <div
                                        className={cn(
                                            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                                            isCurrentUser
                                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                                : 'bg-secondary text-secondary-foreground rounded-bl-md',
                                        )}
                                    >
                                        {message.content}
                                    </div>
                                )}

                                {message.attachments &&
                                    message.attachments.length > 0 && (
                                        <div
                                            className={cn(
                                                'mt-2 flex flex-wrap gap-2',
                                                isCurrentUser
                                                    ? 'justify-end'
                                                    : 'justify-start',
                                            )}
                                        >
                                            {message.attachments.map(
                                                renderAttachment,
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                        onClick={() => setLightboxImage(null)}
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>
                    <img
                        src={lightboxImage || '/placeholder.svg'}
                        alt="Preview"
                        className="max-h-full max-w-full rounded-lg object-contain"
                    />
                </div>
            )}
        </>
    );
}
