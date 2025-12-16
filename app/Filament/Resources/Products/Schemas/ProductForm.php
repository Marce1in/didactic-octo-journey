<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('price')
                    ->numeric()
                    ->inputMode('decimal')
                    ->step('0.01')->prefix('R$')
                    ->formatStateUsing(fn($state) => number_format($state / 100, 2, ',', '.'))
                    ->dehydrateStateUsing(fn($state) => (int) (str_replace(['.', ','], ['', '.'], $state) * 100))->required()
                    ->placeholder('0,00')
                    ->required(),
                MarkdownEditor::make('description')
                    ->nullable()->columnSpan(2),
            ]);
    }
}
