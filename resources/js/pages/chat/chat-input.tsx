import type React from 'react';

import { cn } from '@/lib/utils';
import { FileText, ImageIcon, Paperclip, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Attachment } from './types';

interface ChatInputProps {
    onSendMessage: (content: string, attachments: Attachment[]) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() || attachments.length > 0) {
            onSendMessage(message, attachments);
            setMessage('');
            setAttachments([]);
        }
    };

    const handleFileSelect = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'image' | 'file',
    ) => {
        const files = e.target.files;
        if (files) {
            const newAttachments: Attachment[] = Array.from(files).map(
                (file, i) => ({
                    id: `temp-${Date.now()}-${i}`,
                    type,
                    name: file.name,
                    url: type === 'image' ? URL.createObjectURL(file) : '#',
                    size: formatFileSize(file.size),
                }),
            );
            setAttachments([...attachments, ...newAttachments]);
        }
        setShowAttachMenu(false);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const removeAttachment = (id: string) => {
        setAttachments(attachments.filter((a) => a.id !== id));
    };

    return (
        <div className="border-t border-border bg-card p-4">
            {/* Attachment Preview */}
            {attachments.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2 rounded-sm p-2">
                    {attachments.map((attachment) => (
                        <div key={attachment.id} className="group relative">
                            {attachment.type === 'image' ? (
                                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                                    <img
                                        src={
                                            attachment.url || '/placeholder.svg'
                                        }
                                        alt={attachment.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="max-w-24 truncate text-xs">
                                        {attachment.name}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => removeAttachment(attachment.id)}
                                className="absolute -top-1.5 -right-1.5 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <X className="h-3 w-3" />
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
                        className="rounded-sm p-2.5 transition-colors hover:bg-secondary/10"
                    >
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                    </button>

                    {showAttachMenu && (
                        <div className="absolute bottom-full left-0 mb-2 w-40 rounded-sm border border-border bg-popover shadow-xl">
                            <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="flex w-full items-center gap-3 rounded-t-sm px-4 py-3 text-sm transition-colors hover:bg-secondary/10"
                            >
                                <ImageIcon className="h-4 w-4 text-secondary" />
                                <span>Image</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex w-full items-center gap-3 rounded-b-sm px-4 py-3 text-sm transition-colors hover:bg-secondary/10"
                            >
                                <FileText className="h-4 w-4 text-secondary" />
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
                        onChange={(e) => handleFileSelect(e, 'image')}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, 'file')}
                    />
                </div>

                <div className="flex flex-1 items-end gap-2 rounded-sm border border-border px-4 py-[9px]">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Type a message..."
                        rows={1}
                        className="max-h-32 flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!message.trim() && attachments.length === 0}
                    className={cn(
                        'cursor-pointer rounded-sm p-2 transition-all',
                        message.trim() || attachments.length > 0
                            ? 'text-primary hover:bg-primary/10'
                            : 'text-muted-foreground',
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}
