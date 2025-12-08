<?php

namespace App\Filament\Resources\AgencyCampaigns\Pages;

use App\Filament\Resources\AgencyCampaigns\AgencyCampaignResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAgencyCampaigns extends ListRecords
{
    protected static string $resource = AgencyCampaignResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),
        ];
    }
}
