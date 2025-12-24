import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getTranslatedRole } from '@/lib/utils';
import type { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Loader2, Search, Users } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function AddUsersDialog({
    children,
    chatId,
}: {
    children: ReactNode;
    chatId: number;
}) {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        users: [] as number[],
    });

    const searchUsers = async (searchTerm: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/chats/${chatId}/search-users?search=${encodeURIComponent(searchTerm)}`,
            );
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error searching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        searchUsers(value);
    }, 300);

    useEffect(() => {
        if (open) {
            searchUsers(''); // Load initial users when dialog opens
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            debouncedSearch(search);
        }
    }, [search, open]);

    const toggleUser = (userId: number) => {
        if (form.data.users.includes(userId)) {
            form.setData(
                'users',
                form.data.users.filter((id) => id !== userId),
            );
        } else {
            form.setData('users', [...form.data.users, userId]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(`/chats/${chatId}/users`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                form.reset();
                setSearch('');
                setUsers([]);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="gap-0 border-border p-0 sm:max-w-[480px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="px-6 pt-6 pb-4">
                        <DialogTitle>Adicionar usuários</DialogTitle>
                        <DialogDescription>
                            Selecione os usuários que deseja adicionar à
                            conversa.
                        </DialogDescription>
                    </DialogHeader>

                    <Separator />

                    <div className="px-6 py-4">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar usuários..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                            {isLoading && (
                                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                            )}
                        </div>
                    </div>

                    <ScrollArea className="h-80 border-y border-border">
                        {isLoading && users.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center gap-2 py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    Carregando...
                                </p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center">
                                <div className="rounded-full bg-muted p-3">
                                    <Users className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Nenhum usuário encontrado
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {users.map((user) => {
                                    const isSelected = form.data.users.includes(
                                        user.id,
                                    );
                                    return (
                                        <div
                                            key={user.id}
                                            className={`flex cursor-pointer items-center gap-4 border-b border-border px-6 py-3 transition-colors hover:bg-muted/50 ${
                                                isSelected ? 'bg-muted/30' : ''
                                            }`}
                                            onClick={() => toggleUser(user.id)}
                                        >
                                            <Checkbox
                                                checked={isSelected}
                                                className="shrink-0"
                                            />

                                            <Avatar className="h-9 w-9 shrink-0">
                                                <AvatarImage
                                                    src={
                                                        user.avatar_url ||
                                                        '/placeholder.svg'
                                                    }
                                                />
                                                <AvatarFallback className="text-xs">
                                                    {user.name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm leading-none font-medium">
                                                    {user.name}
                                                </p>
                                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>

                                            <Badge
                                                variant="outline"
                                                className="shrink-0 text-xs font-normal"
                                            >
                                                {getTranslatedRole(user.role)}
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea>

                    <div className="flex items-center justify-between gap-4 px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            {form.data.users.length > 0
                                ? `${form.data.users.length} selecionado(s)`
                                : 'Nenhum selecionado'}
                        </p>

                        {form.errors.users && (
                            <p className="text-sm text-destructive">
                                {form.errors.users}
                            </p>
                        )}

                        <div className="flex items-center gap-2">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={form.processing}
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={
                                    form.processing ||
                                    form.data.users.length === 0
                                }
                            >
                                {form.processing
                                    ? 'Adicionando...'
                                    : 'Adicionar'}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
