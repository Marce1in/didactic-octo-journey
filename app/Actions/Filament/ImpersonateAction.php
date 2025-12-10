<?php

namespace App\Actions\Filament;

use Closure;
use Filament\Actions\Action;
use Filament\Support\Facades\FilamentIcon;
use Filament\Support\Icons\Heroicon;
use Filament\Actions\View\ActionsIconAlias;

class ImpersonateAction extends Action
{
    protected ?Closure $redirectUrlUsing = null;

    public static function getDefaultName(): ?string
    {
        return 'impersonate';
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->label(__('Impersonar'));

        $this->defaultColor('primary');

        $this->icon(Heroicon::OutlinedArrowRightStartOnRectangle);
    }

    // public function action(): void {}

    public function redirectUrlUsing(?Closure $callback): static
    {
        $this->redirectUrlUsing = $callback;

        return $this;
    }
}
