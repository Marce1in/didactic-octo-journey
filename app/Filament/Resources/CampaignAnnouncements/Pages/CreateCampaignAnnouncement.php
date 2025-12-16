<?php

namespace App\Filament\Resources\CampaignAnnouncements\Pages;

use App\Filament\Resources\CampaignAnnouncements\CampaignAnnouncementResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCampaignAnnouncement extends CreateRecord
{
    protected static string $resource = CampaignAnnouncementResource::class;
}
