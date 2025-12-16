<?php

namespace App\Filament\Resources\CampaignAnnouncements\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CampaignAnnouncementInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('agency_cut')
                    ->numeric(),
                TextEntry::make('budget')
                    ->numeric(),
                TextEntry::make('product.name')
                    ->label('Product'),
                TextEntry::make('company.name')
                    ->label('Company'),
                TextEntry::make('category.title')
                    ->label('Category')
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
