<?php

namespace App\Filament\Resources\InfluencerCampaigns\Pages;

use App\Filament\Resources\InfluencerCampaigns\InfluencerCampaignResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditInfluencerCampaign extends EditRecord
{
    protected static string $resource = InfluencerCampaignResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
