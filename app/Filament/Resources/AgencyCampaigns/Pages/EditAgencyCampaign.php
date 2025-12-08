<?php

namespace App\Filament\Resources\AgencyCampaigns\Pages;

use App\Filament\Resources\AgencyCampaigns\AgencyCampaignResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAgencyCampaign extends EditRecord
{
    protected static string $resource = AgencyCampaignResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
