import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChevronLeft, MessageCircle } from 'lucide-react';

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    isGroup: boolean;
    members?: number;
    active?: boolean;
}

interface ChatSidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    activeConversation: string;
    onSelectConversation: (id: string) => void;
}

const conversations: Conversation[] = [
    {
        id: '1',
        name: 'Design Team',
        avatar: '/design-team-group.jpg',
        lastMessage: 'Sarah: Perfect! Also sharing the component library...',
        timestamp: 'now',
        unread: 0,
        isGroup: true,
        members: 4,
        active: true,
    },
    {
        id: '2',
        name: 'Sarah Chen',
        avatar: '/professional-woman-avatar.png',
        lastMessage: 'Let me check the files and get back to you',
        timestamp: '10:32 AM',
        unread: 2,
        isGroup: false,
    },
    {
        id: '3',
        name: 'Project Alpha',
        avatar: '/project-team-group.jpg',
        lastMessage: 'Marcus: The deployment is scheduled for Monday',
        timestamp: 'Yesterday',
        unread: 0,
        isGroup: true,
        members: 6,
    },
    {
        id: '4',
        name: 'Marcus Johnson',
        avatar: '/professional-man-avatar.png',
        lastMessage: 'Thanks for the update!',
        timestamp: 'Yesterday',
        unread: 0,
        isGroup: false,
    },
    {
        id: '5',
        name: 'Family Group',
        avatar: '/diverse-family-gathering.png',
        lastMessage: "Mom: Don't forget dinner on Sunday!",
        timestamp: 'Monday',
        unread: 5,
        isGroup: true,
        members: 8,
    },
    {
        id: '6',
        name: 'Emma Wilson',
        avatar: '/woman-avatar-casual.jpg',
        lastMessage: 'See you at the meeting tomorrow',
        timestamp: 'Monday',
        unread: 0,
        isGroup: false,
    },
];

export function ChatSidebar({
    isOpen,
    onToggle,
    activeConversation,
    onSelectConversation,
}: ChatSidebarProps) {
    return (
        <aside
            className={cn(
                'bg-sidebar border-sidebar-border flex flex-col border-r transition-all duration-300 ease-in-out',
                isOpen ? 'w-80' : 'w-0 overflow-hidden',
            )}
        >
            {/* Header - removed search */}
            <div className="border-sidebar-border flex items-center justify-between border-b p-4">
                <h1 className="text-sidebar-foreground text-xl font-semibold">
                    Chats
                </h1>
                <div className="flex items-center gap-2">
                    <button className="hover:bg-sidebar-accent rounded-full p-2 transition-colors">
                        <MessageCircle className="text-sidebar-foreground h-5 w-5" />
                    </button>
                    <button
                        onClick={onToggle}
                        className="hover:bg-sidebar-accent rounded-full p-2 transition-colors"
                    >
                        <ChevronLeft className="text-sidebar-foreground h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {conversations.map((convo) => (
                    <button
                        key={convo.id}
                        onClick={() => onSelectConversation(convo.id)}
                        className={cn(
                            'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                            activeConversation === convo.id
                                ? 'bg-sidebar-primary/10'
                                : 'hover:bg-sidebar-accent',
                        )}
                    >
                        <div className="relative">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                    src={convo.avatar || '/placeholder.svg'}
                                    alt={convo.name}
                                />
                                <AvatarFallback className="text-sm">
                                    {convo.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            {convo.isGroup && (
                                <span className="bg-sidebar-primary text-sidebar-primary-foreground border-sidebar absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-medium">
                                    {convo.members}
                                </span>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sidebar-foreground truncate font-medium">
                                    {convo.name}
                                </span>
                                <span
                                    className={cn(
                                        'text-xs',
                                        convo.unread > 0
                                            ? 'text-primary font-medium'
                                            : 'text-muted-foreground',
                                    )}
                                >
                                    {convo.timestamp}
                                </span>
                            </div>
                            <div className="mt-0.5 flex items-center justify-between">
                                <p className="text-muted-foreground truncate pr-2 text-sm">
                                    {convo.lastMessage}
                                </p>
                                {convo.unread > 0 && (
                                    <span className="bg-primary text-primary-foreground flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                                        {convo.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
}
