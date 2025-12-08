<?php

namespace App\Filament\Resources\InfluencerCampaigns\Pages;

use App\Filament\Resources\InfluencerCampaigns\InfluencerCampaignResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListInfluencerCampaigns extends ListRecords
{
    protected static string $resource = InfluencerCampaignResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),
        ];
    }
}
