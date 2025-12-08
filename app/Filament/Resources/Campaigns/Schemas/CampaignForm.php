<?php

namespace App\Filament\Resources\Campaigns\Schemas;

use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CampaignForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nome da Campanha')
                    ->required(),

                Select::make('product_id')
                    ->relationship('product', 'name')
                    ->label('Produto')
                    ->required(),

                Hidden::make('company_id')
                    ->default(Auth::id()),

                Select::make('agency_id')
                    ->label('Agência')
                    ->options(
                        User::where('role', 'agency')
                            ->pluck('name', 'id')
                    )
                    ->searchable()
                    ->required()
                    ->live(),

                Select::make('influencer_id')
                    ->label('Influencer')
                    ->options(
                        fn(Get $get) =>
                        User::where('role', 'influencer')
                            ->where('agency_id', $get('agency_id'))
                            ->pluck('name', 'id')
                    )
                    ->searchable()
                    ->required()
                    ->hidden(fn(Get $get) => !$get('agency_id')) // Hide until agency is selected
                    ->disabled(fn(Get $get) => !$get('agency_id')), // Disable until agency is selected
            ]);
    }
}
