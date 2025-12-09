<?php

namespace App\Filament\Resources\Influencers\Pages;

use App\Filament\Resources\Influencers\InfluencerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;

class ListInfluencers extends ListRecords
{
    protected static string $resource = InfluencerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'Nossos Influenciadores' => Tab::make()->modifyQueryUsing(function ($query) {
                $query->where('association_status', 'approved');
            }),
            'Pedidos de Vínculo' => Tab::make()->modifyQueryUsing(function ($query) {
                $query->where('association_status', 'pending');
            })
        ];
    }
}
