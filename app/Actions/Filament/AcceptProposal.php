<?php

namespace App\Actions\Filament;

use App\ApprovalStatus;
use App\Models\OngoingCampaign;
use App\Models\Proposal;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Colors\Color;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AcceptProposal extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'acceptProposal';
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->label('Aprovar Proposta');
        $this->color(Color::Green);
        $this->icon('heroicon-o-check-circle');
        $this->button();

        // $this->modalHeading('Confirmar aprovação da Proposta');
        // $this->modalDescription('Tem certeza de que deseja aprovar esta proposta? Isto iniciará a Campanha.');
        // $this->modalSubmitActionLabel('Aprovar')->color('primary');

        $this->action(function (Proposal $record) {

            try {
                $record->update(['company_approval' => 'approved']);

                Notification::make()
                    ->title('Proposta Aprova')
                    ->body('A proposta foi aprovada. ')
                    ->success()
                    ->send();
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Erro ao aprovar proposta: ' . $e->getMessage());
                Notification::make()
                    ->title('Erro ao Aprovar Proposta')
                    ->body('Ocorreu um erro ao iniciar a campanha. Tente novamente.')
                    ->danger()
                    ->send();
            } finally {
                $record->agency->notify(
                    Notification::make()
                        ->title('Empresa aprovou proposta')->success()
                        ->body(Auth::user()->name . ' aprovou a proposta para ' . $record->announcement->name)
                        ->toDatabase()
                );

                $record->influencers->each(function ($influencer) use ($record) {
                    $influencer->notify(
                        Notification::make()
                            ->title('Empresa aprovou proposta')->success()
                            ->body(Auth::user()->name . ' aprovou a proposta para ' . $record->announcement->name)
                            ->toDatabase()
                    );
                });
            }
        });
    }
}
