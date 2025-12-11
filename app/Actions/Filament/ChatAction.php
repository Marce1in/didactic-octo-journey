<?php

namespace App\Actions\Filament;

use Closure;
use Filament\Actions\Action;
use Filament\Support\Icons\Heroicon;

class ChatAction extends Action
{
    protected ?Closure $redirectUrlUsing = null;

    public static function getDefaultName(): ?string
    {
        return 'chat';
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->label(__('Chat'));

        $this->defaultColor('primary');

        $this->tableIcon(Heroicon::OutlinedChatBubbleLeftEllipsis);
    }

    public function redirectUrlUsing(?Closure $callback): static
    {
        $this->redirectUrlUsing = $callback;

        return $this;
    }
}
