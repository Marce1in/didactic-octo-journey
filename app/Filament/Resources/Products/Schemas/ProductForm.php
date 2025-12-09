<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\Textarea;
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
                    ->step('0.01')
                    ->required(),
                Textarea::make('description')
                    ->rows(4)
                    ->nullable(),
            ]);
    }
}
