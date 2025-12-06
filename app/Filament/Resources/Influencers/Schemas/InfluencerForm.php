<?php

namespace App\Filament\Resources\Influencers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class InfluencerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
            ]);
    }
}
