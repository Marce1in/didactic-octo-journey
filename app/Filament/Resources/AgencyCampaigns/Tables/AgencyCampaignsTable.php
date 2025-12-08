<?php

namespace App\Filament\Resources\AgencyCampaigns\Tables;

use Filament\Actions\ActionGroup;
use Filament\Actions\ApproveCampaignAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\RejectCampaignAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\App;

class AgencyCampaignsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label('Campanha')
                    ->searchable(),
                TextColumn::make('product.name')->label('Produto')
                    ->searchable(),
                TextColumn::make('influencer.name')->label('Influenciador')
                    ->searchable(),
                TextColumn::make('company.name')->label('Empresa')
                    ->searchable(),

                TextColumn::make('status')
                    ->searchable()
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'pending_approval' => 'Aprovação Pendente',
                        'active' => 'Ativa',
                        'finished' => 'Concluído',
                        'cancelled' => 'Cancelada',
                        default => $state,
                    }),
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
                ActionGroup::make([
                    ApproveCampaignAction::make(),
                    RejectCampaignAction::make(),
                ]),
            ])
            ->toolbarActions([
                // BulkActionGroup::make([
                //     DeleteBulkAction::make(),
                // ]),

            ]);
    }
}
