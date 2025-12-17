import { User } from '@/types';

export interface Attachment {
    id: string;
    type: 'image' | 'file';
    name: string;
    url: string;
    size: string;
}

export interface Message {
    id: string;
    user_id: string;
    content?: string;
    created_at: Date;
    attachments?: Attachment[];
}

export interface ChatType {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    image: string;
    users: User[];
    messages: Message[];
}
