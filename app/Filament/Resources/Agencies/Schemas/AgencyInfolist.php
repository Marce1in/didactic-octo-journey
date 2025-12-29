<?php

namespace App\Filament\Resources\Agencies\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\TextSize;
use Filament\Support\Icons\Heroicon;

class AgencyInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Agência')
                    ->icon(Heroicon::OutlinedBuildingStorefront)
                    ->columns(3)
                    ->schema([
                        ImageEntry::make('avatar_url')
                            ->hiddenLabel()
                            ->circular()
                            ->imageSize(96),

                        TextEntry::make('name')->columnSpan(2)
                            ->hiddenLabel()
                            ->size(TextSize::Large)
                            ->weight(FontWeight::Bold),

                        TextEntry::make('bio')->columnSpan(3)
                            ->hiddenLabel()
                            ->columnSpanFull()
                            ->placeholder('Sem bio cadastrada'),
                    ]),

                Section::make('Categorias dos Influenciadores')
                    ->icon('heroicon-o-tag')
                    ->schema([
                        TextEntry::make('influencer_categories')->hiddenLabel()
                            ->badge()
                            ->getStateUsing(
                                fn ($record) => $record->influencers
                                    ->flatMap(fn ($inf) => $inf->subcategories)
                                    ->pluck('title')
                                    ->unique()
                                    ->values()
                                    ->all()
                            )
                            ->placeholder('-'),
                    ]),

                Group::make()->schema([
                    Section::make('Seguidores Totais')
                        ->icon('heroicon-o-users')
                        ->columns(5)
                        ->schema([
                            TextEntry::make('igfollowers')
                                ->label('Instagram')
                                ->state(
                                    fn ($record) => ($sum = $record->influencers
                                        ->sum('influencer_info.instagram_followers'))
                                        ? number_format($sum)
                                        : '-'
                                ),

                            TextEntry::make('twfollowers')
                                ->label('Twitter')
                                ->state(
                                    fn ($record) => ($sum = $record->influencers
                                        ->sum('influencer_info.twitter_followers'))
                                        ? number_format($sum)
                                        : '-'
                                ),

                            TextEntry::make('ytfollowers')
                                ->label('YouTube')
                                ->state(
                                    fn ($record) => ($sum = $record->influencers
                                        ->sum('influencer_info.youtube_followers'))
                                        ? number_format($sum)
                                        : '-'
                                ),

                            TextEntry::make('fbfollowers')
                                ->label('Facebook')
                                ->state(
                                    fn ($record) => ($sum = $record->influencers
                                        ->sum('influencer_info.facebook_followers'))
                                        ? number_format($sum)
                                        : '-'
                                ),

                            TextEntry::make('ttfollowers')
                                ->label('TikTok')
                                ->state(
                                    fn ($record) => ($sum = $record->influencers
                                        ->sum('influencer_info.tiktok_followers'))
                                        ? number_format($sum)
                                        : '-'
                                ),
                        ]),
                ]),

            ]);
    }
}
