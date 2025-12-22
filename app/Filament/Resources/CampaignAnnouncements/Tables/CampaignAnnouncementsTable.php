<?php

namespace App\Filament\Resources\CampaignAnnouncements\Tables;

use App\Actions\Filament\ProposeAction;
use App\Actions\Filament\ViewProposal;
use App\ApprovalStatus;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\ColumnGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CampaignAnnouncementsTable
{

    public static function configure(Table $table): Table
    {
        $colorByStatus = fn(string $state) => match ($state) {
            'approved' => 'success',
            'pending'  => 'gray',    // neutral
            'rejected' => 'danger',
        };

        return $table
            ->columns([
                // ANNOUNCEMENTS TAB
                TextColumn::make('name')->label('Campanha')
                    ->searchable()->visible(fn($livewire) => $livewire->activeTab === 'announcements'),

                ImageColumn::make('company.avatar_url')->circular()->label(' ')
                    ->visible(fn($livewire) => Gate::denies('is_company') && $livewire->activeTab === 'announcements'),

                TextColumn::make('company.name')->label('Empresa')
                    ->searchable()->visible(fn($livewire) => Gate::denies('is_company') && $livewire->activeTab === 'announcements'),
                TextColumn::make('product.name')->label('Produto')
                    ->searchable()->visible(fn($livewire) => $livewire->activeTab === 'announcements'),

                TextColumn::make('description')->label("Descrição")->limit(40)->tooltip(fn($record) => $record->description)
                    ->visible(fn($livewire) => $livewire->activeTab === 'announcements'),
                TextColumn::make('budget')->label('Orçamento')->money('BRL')
                    ->sortable()->visible(fn($livewire) => $livewire->activeTab === 'announcements'),
                TextColumn::make('agency_cut')->label('Porcentagem da Agência')
                    ->numeric()->suffix('%')
                    ->sortable()->visible(fn($livewire) => $livewire->activeTab === 'announcements'),
                TextColumn::make('category.title')->label('Categoria')->badge()
                    ->searchable()->visible(fn($livewire) => $livewire->activeTab === 'announcements'),
                TextColumn::make('created_at')->label('Anunciada em')
                    ->dateTime()
                    ->sortable()->visible(fn($livewire) => $livewire->activeTab === 'announcements')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')->label('Atualizada em')
                    ->dateTime()
                    ->sortable()->visible(fn($livewire) => $livewire->activeTab === 'announcements')
                    ->toggleable(isToggledHiddenByDefault: true),

                // PROPOSALS TAB
                TextColumn::make('announcement.name')->label('Campanha')
                    ->searchable()
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                TextColumn::make('announcement.product.name')->label('Produto')
                    ->searchable()
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                TextColumn::make('announcement.category.title')->label('Categoria')
                    ->badge()
                    ->searchable()
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                // ColumnGroup::make('Agência', [
                ImageColumn::make('agency.avatar_url')
                    ->circular()
                    ->label('Agência')
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                TextColumn::make('agency.name')
                    ->label(' ')
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),
                // ]),

                // ColumnGroup::make('Influenciador', [
                ImageColumn::make('influencer.avatar_url')
                    ->circular()
                    ->label('Influenciador')
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                TextColumn::make('influencer.name')
                    ->label(' ')
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),
                // ]),

                TextColumn::make('message')
                    ->label('Mensagem')
                    ->limit(40)
                    ->tooltip(fn($record) => $record->message)
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                TextColumn::make('proposed_agency_cut')
                    ->label('Parcela Proposta')
                    ->numeric()
                    ->suffix('%')
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),


                ColumnGroup::make('Aprovação')->columns([

                    TextColumn::make('company_approval')
                        ->label('company')
                        ->badge()
                        ->color($colorByStatus)
                        ->visible(fn($livewire) => $livewire->activeTab === 'proposals')->formatStateUsing(fn($state): string => __("approval_status.$state")),

                    TextColumn::make('agency_approval')
                        ->label('Agência')
                        ->badge()
                        ->color($colorByStatus)
                        ->visible(fn($livewire) => $livewire->activeTab === 'proposals')->formatStateUsing(fn($state): string => __("approval_status.$state")),

                    TextColumn::make('influencer_approval')
                        ->label('influencer')->badge()
                        ->color($colorByStatus)
                        ->visible(fn($livewire) => $livewire->activeTab === 'proposals')->formatStateUsing(fn($state): string => __("approval_status.$state")),

                ]),


            ])
            ->filters([
                //
            ])
            ->recordAction(fn($livewire) => $livewire->activeTab === 'announcements' ? 'view' : 'viewProposal')
            ->recordActions([
                ViewAction::make()
                    ->visible(fn($livewire) => $livewire->activeTab === 'announcements'),

                EditAction::make()
                    ->visible(fn($record) => Auth::id() === $record->company_id),

                ViewProposal::make()
                    ->visible(fn($livewire) => $livewire->activeTab === 'proposals'),

                ProposeAction::make(),

                Action::make('remove_proposal')
                    ->label('Remover Interesse')
                    ->color('danger')
                    ->visible(
                        fn($record) =>
                        Gate::allows('is_agency')
                            && $record->proposals()
                            ->where('agency_id', Auth::id())
                            ->exists()
                    )
                    ->action(
                        fn($record) => $record->proposals()->where('agency_id', Auth::id())->delete()
                    ),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->visible(Gate::allows('is_company')),
                ]),
            ]);
    }
}
