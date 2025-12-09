<?php

namespace App\Filament\Resources\Influencers\Tables;

use App\UserRoles;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\ChatAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class InfluencersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar_url')
                    ->label('')
                    ->circular(),
                TextColumn::make('name')->label('Nome')
                    ->searchable(),
                TextColumn::make('agency.name')->label('Agência')->default('___')
                    ->searchable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                // EditAction::make(),
                ChatAction::make()->visible(fn($record): bool => Auth::user()->role === UserRoles::Company),

            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    // DeleteBulkAction::make(),
                ]),
            ]);
    }
}
