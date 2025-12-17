import { useRef, useState } from 'react';
import '../../../css/filament/admin/theme.css';
import { ChatSidebar } from './chat-sidebar';
import { GroupChat } from './group-chat';
import { ChatType } from './types';

export default function Chats({
    allChats,
    chat,
}: {
    allChats: ChatType[];
    chat?: ChatType;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeConversation, setActiveConversation] = useState(chat?.id);
    const [infoPanelOpen, setInfoPanelOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    return (
        <main className="flex min-h-screen bg-background">
            <ChatSidebar
                isOpen={sidebarOpen}
                allChats={allChats}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                activeConversation={activeConversation}
                onSelectConversation={setActiveConversation}
            />

            {chat ? (
                <GroupChat
                    allChats={allChats}
                    chat={chat}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                />
            ) : (
                <div>nenhum chat</div>
            )}
        </main>
    );
}
