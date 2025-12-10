<?php

namespace App\Providers\Filament;

use App\Models\User;
use App\UserRoles;
use DutchCodingCompany\FilamentSocialite\FilamentSocialitePlugin;
use DutchCodingCompany\FilamentSocialite\Provider;
use Filament\Forms\Components\Placeholder;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Infolists\Components\TextEntry;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Support\Assets\Font;
use Filament\Support\Assets\Js;
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Vite;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Wirechat\Wirechat\Facades\Wirechat;

class AdminPanelProvider extends PanelProvider
{

    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('dashboard')

            ->colors([
                'primary' => '#d87943',
                'secondary' => "#5f8787",
            ])
            ->login()
            // ->brandLogo(asset('assets/logo.png'))
            // ->brandLogo(fn() => view('filament.logo'))->brandLogoHeight('18px')
            ->brandName('InfluHub')
            ->registration()
            ->passwordReset()
            // ->emailVerification()
            // ->emailChangeVerification()
            ->profile()
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->renderHook(PanelsRenderHook::HEAD_END, fn(): string => Auth::check() ? Blade::render('@wirechatStyles') : '')
            ->renderHook(PanelsRenderHook::BODY_END, fn(): string => Auth::check() ? Blade::render('@wirechatAssets') : '')
            ->renderHook(
                PanelsRenderHook::AUTH_REGISTER_FORM_AFTER,
                fn(): string => Blade::render(<<<'BLADE'
                    <div x-data="{ role: @entangle('data.role') }">
                        <div x-show="role === 'influencer'">
                            <x-filament-socialite::buttons />
                        </div>
                    </div>
                BLADE)
            )
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])->viteTheme('resources/css/filament/admin/theme.css')
            ->plugins([
                FilamentSocialitePlugin::make()
                    ->providers([
                        Provider::make('instagram')
                            ->label('Instagram')
                            ->icon('fab-instagram')
                            ->color('#C13584')
                            ->outlined(false)
                            ->stateless(false),
                    ])
                    ->registration(true),

            ]);
    }
}
