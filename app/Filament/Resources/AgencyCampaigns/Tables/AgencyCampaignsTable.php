<?php

namespace App\Filament\Resources\AgencyCampaigns\Tables;

use App\CampaignStatus;
use Filament\Actions\ActionGroup;
use Filament\Actions\ApproveCampaignAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\RejectCampaignAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;
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
                    ->formatStateUsing(fn(CampaignStatus $state): string => match ($state) {
                        CampaignStatus::PendingApproval => 'Aprovação Pendente',
                        CampaignStatus::Active => 'Ativo',
                        CampaignStatus::Finished => 'Concluído',
                        CampaignStatus::Cancelled => 'Cancelado',
                        default => $state->value,
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
                ])->visible(fn(Model $record) => $record->status === CampaignStatus::PendingApproval),
            ])
            ->toolbarActions([
                // BulkActionGroup::make([
                //     DeleteBulkAction::make(),
                // ]),

            ]);
    }
}
