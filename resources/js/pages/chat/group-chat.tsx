import { useRef, useState } from 'react';
import { ChatHeader } from './chat-header';
import { ChatInfoPanel } from './chat-info-panel';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { ChatSidebar } from './chat-sidebar';
import type { Attachment, Conversation, Message, User } from './types';

const users: User[] = [
    { id: '1', name: 'You', avatar: '/person-avatar-1.png', status: 'online' },
    {
        id: '2',
        name: 'Sarah Chen',
        avatar: '/professional-woman-avatar.png',
        status: 'online',
    },
    {
        id: '3',
        name: 'Marcus Johnson',
        avatar: '/professional-man-avatar.png',
        status: 'online',
    },
    {
        id: '4',
        name: 'Emma Wilson',
        avatar: '/woman-avatar-casual.jpg',
        status: 'away',
    },
];

const initialConversation: Conversation = {
    id: '1',
    name: 'Design Team',
    description:
        "Our creative space for sharing design ideas, mockups, and feedback. Let's build something amazing together!",
    createdAt: new Date(2024, 0, 15),
    isGroup: true,
    avatar: '/design-team-group.jpg',
    members: users,
};

const initialMessages: Message[] = [
    {
        id: '1',
        userId: '2',
        content:
            'Hey team! Just finished the design mockups for the new dashboard. Let me know what you think!',
        timestamp: new Date(Date.now() - 3600000 * 2),
        attachments: [
            {
                id: 'a1',
                type: 'image',
                name: 'dashboard-v2.png',
                url: '/modern-dashboard-design-mockup.jpg',
                size: '2.4 MB',
            },
        ],
    },
    {
        id: '2',
        userId: '3',
        content:
            "These look amazing Sarah! Love the color scheme. I've attached the updated requirements doc for reference.",
        timestamp: new Date(Date.now() - 3600000 * 1.5),
        attachments: [
            {
                id: 'a2',
                type: 'file',
                name: 'requirements-v3.pdf',
                url: '#',
                size: '156 KB',
            },
        ],
    },
    {
        id: '3',
        userId: '4',
        content:
            'Great work! Here are some reference images I found that might help with the icon style:',
        timestamp: new Date(Date.now() - 3600000),
        attachments: [
            {
                id: 'a3',
                type: 'image',
                name: 'icon-ref-1.png',
                url: '/minimalist-icon-set.png',
                size: '890 KB',
            },
            {
                id: 'a4',
                type: 'image',
                name: 'icon-ref-2.png',
                url: '/modern-ui-icons.jpg',
                size: '1.1 MB',
            },
        ],
    },
    {
        id: '4',
        userId: '1',
        content:
            "This is coming together nicely. I'll review the requirements doc and get back to you by EOD.",
        timestamp: new Date(Date.now() - 1800000),
    },
    {
        id: '5',
        userId: '2',
        content: "Perfect! Also sharing the component library we'll be using:",
        timestamp: new Date(Date.now() - 900000),
        attachments: [
            {
                id: 'a5',
                type: 'file',
                name: 'component-library.zip',
                url: '#',
                size: '12.3 MB',
            },
        ],
    },
];

export function GroupChat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeConversation, setActiveConversation] = useState('1');
    const [conversation, setConversation] =
        useState<Conversation>(initialConversation);
    const [infoPanelOpen, setInfoPanelOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (content: string, attachments: Attachment[]) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            userId: '1',
            content,
            timestamp: new Date(),
            attachments: attachments.length > 0 ? attachments : undefined,
        };
        setMessages([...messages, newMessage]);
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleUpdateConversation = (updates: Partial<Conversation>) => {
        setConversation((prev) => ({ ...prev, ...updates }));
    };

    return (
        <div className="flex h-screen">
            <ChatSidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                activeConversation={activeConversation}
                onSelectConversation={setActiveConversation}
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <ChatHeader
                    conversation={conversation}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                    onHeaderClick={() => setInfoPanelOpen(true)}
                />
                <ChatMessages
                    messages={messages}
                    users={users}
                    messagesEndRef={messagesEndRef}
                />
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
            <ChatInfoPanel
                conversation={conversation}
                isOpen={infoPanelOpen}
                onClose={() => setInfoPanelOpen(false)}
                onUpdateConversation={handleUpdateConversation}
            />
        </div>
    );
}
