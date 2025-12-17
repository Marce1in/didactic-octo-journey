'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, MoreVertical } from 'lucide-react';
import type { Conversation } from './types';

interface ChatHeaderProps {
    conversation: Conversation;
    onToggleSidebar: () => void;
    sidebarOpen: boolean;
    onHeaderClick: () => void;
}

export function ChatHeader({
    conversation,
    onToggleSidebar,
    sidebarOpen,
    onHeaderClick,
}: ChatHeaderProps) {
    const onlineCount = conversation.members.filter(
        (u) => u.status === 'online',
    ).length;

    return (
        <header className="bg-card border-border flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
                {!sidebarOpen && (
                    <button
                        onClick={onToggleSidebar}
                        className="hover:bg-secondary mr-2 rounded-lg p-2 transition-colors"
                    >
                        <Menu className="text-muted-foreground h-5 w-5" />
                    </button>
                )}
                <button
                    onClick={onHeaderClick}
                    className="hover:bg-secondary/50 -mx-2 -my-1 flex items-center gap-3 rounded-lg px-2 py-1 transition-colors"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={conversation.avatar || '/placeholder.svg'}
                        />
                        <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <h2 className="text-foreground font-semibold">
                            {conversation.name}
                        </h2>
                        <p className="text-muted-foreground text-xs">
                            {conversation.isGroup
                                ? `${conversation.members.length} members, ${onlineCount} online`
                                : conversation.members[1]?.status === 'online'
                                  ? 'online'
                                  : 'last seen recently'}
                        </p>
                    </div>
                </button>
            </div>

            <div className="flex items-center gap-1">
                <div className="mr-3 flex -space-x-2">
                    {conversation.members.slice(0, 4).map((user) => (
                        <Avatar
                            key={user.id}
                            className="border-card h-8 w-8 border-2"
                        >
                            <AvatarImage
                                src={user.avatar || '/placeholder.svg'}
                                alt={user.name}
                            />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
                <button className="hover:bg-secondary rounded-lg p-2 transition-colors">
                    <MoreVertical className="text-muted-foreground h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
