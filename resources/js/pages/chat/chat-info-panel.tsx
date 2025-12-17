import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePage } from '@inertiajs/react';
import { Calendar, Check, Info, Pencil, Users, X } from 'lucide-react';
import { useState } from 'react';
import type { ChatType } from './types';

interface ChatInfoPanelProps {
    conversation: ChatType;
    isOpen: boolean;
    onClose: () => void;
    onUpdateConversation: (updates: Partial<ChatType>) => void;
}

export function ChatInfoPanel({
    conversation,
    isOpen,
    onClose,
    onUpdateConversation,
}: ChatInfoPanelProps) {
    const [editingName, setEditingName] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [name, setName] = useState(conversation.name);
    const [description, setDescription] = useState(conversation.description);

    const handleSaveName = () => {
        onUpdateConversation({ name });
        setEditingName(false);
    };

    const handleSaveDescription = () => {
        onUpdateConversation({ description });
        setEditingDescription(false);
    };

    const { auth } = usePage().props as any;
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-md transform border-l border-border bg-card transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold text-foreground">
                        Chat Info
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition-colors hover:bg-secondary"
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="h-[calc(100%-65px)] overflow-y-auto p-6">
                    {/* Avatar and Name */}
                    <div className="mb-8 flex flex-col items-center">
                        {/* <Avatar className="mb-4 h-24 w-24">
                            <AvatarImage
                                src={conversation.avatar_url_url_url_url || '/placeholder.svg'}
                            />
                            <AvatarFallback className="text-2xl">
                                {conversation.name[0]}
                            </AvatarFallback>
                        </Avatar> */}

                        {/* Editable Name */}
                        <div className="flex w-full items-center justify-center gap-2">
                            {editingName ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="rounded-lg border border-border bg-secondary px-3 py-2 text-center text-lg font-semibold text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                        autoFocus
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' &&
                                            handleSaveName()
                                        }
                                    />
                                    <button
                                        onClick={handleSaveName}
                                        className="rounded-lg bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        <Check className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="group flex items-center gap-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        {conversation.name}
                                    </h3>
                                    <button
                                        onClick={() => setEditingName(true)}
                                        className="rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-secondary"
                                    >
                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {`${conversation.users.length} users`}
                        </p>
                    </div>

                    {/* Description Section */}
                    <div className="mb-6">
                        <div className="mb-3 flex items-center gap-2">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                Description
                            </span>
                        </div>
                        {editingDescription ? (
                            <div className="flex flex-col gap-2">
                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="resize-none rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                    rows={3}
                                    autoFocus
                                />
                                <button
                                    onClick={handleSaveDescription}
                                    className="self-end rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div
                                className="group cursor-pointer rounded-lg bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                                onClick={() => setEditingDescription(true)}
                            >
                                <p className="text-foreground">
                                    {conversation.description ||
                                        'Add a description...'}
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                    Click to edit
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Creation Date */}
                    <div className="mb-6">
                        <div className="mb-3 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                Created
                            </span>
                        </div>
                        <p className="px-4 text-foreground">
                            {/* {conversation.created_at.toLocaleDateString(
                                'pt-BR',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )} */}
                        </p>
                    </div>

                    {/* Members Section */}
                    {conversation && (
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                    Members ({conversation.users.length})
                                </span>
                            </div>
                            <div className="space-y-1">
                                {conversation.users.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-secondary"
                                    >
                                        <div className="relative">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={
                                                        member.avatar_url_url_url_url ||
                                                        '/placeholder.svg'
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {member.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-foreground">
                                                {member.name}
                                                {member.id === auth.user.id && (
                                                    <span className="ml-2 text-xs text-muted-foreground">
                                                        (You)
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
