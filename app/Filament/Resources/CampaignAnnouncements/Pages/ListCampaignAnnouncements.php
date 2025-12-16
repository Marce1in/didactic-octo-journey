<?php

namespace App\Filament\Resources\CampaignAnnouncements\Pages;

use App\Filament\Resources\CampaignAnnouncements\CampaignAnnouncementResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ListCampaignAnnouncements extends ListRecords
{
    protected static string $resource = CampaignAnnouncementResource::class;

    public ?string $activeTab = 'announcements';

    public function getTabs(): array
    {
        if (Gate::denies('is_company')) {
            return [];
        }

        return [
            'announcements' => Tab::make('Anúncios')
                ->modifyQueryUsing(
                    fn(Builder $query) =>
                    $query->where('company_id', Auth::id())
                ),

            'proposals' => Tab::make('Propostas')
                ->modifyQueryUsing(
                    fn(Builder $query) =>
                    $query
                        ->join('proposals', 'proposals.campaign_announcement_id', '=', 'campaign_announcements.id')
                        ->join('users as agencies', 'agencies.id', '=', 'proposals.agency_id')
                        ->where('campaign_announcements.company_id', Auth::id())
                        ->select([
                            'campaign_announcements.*',
                            'proposals.id as proposal_id',
                            'agencies.id as agency_id',
                            'agencies.name as agency_name',
                            'agencies.avatar as agency_avatar',
                        ])
                ),
        ];
    }



    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Anunciar Campanha'),
        ];
    }
}
