<x-filament-panels::page>
    {{-- Approved Influencers Table --}}
    <div class="mb-8">
        {{ $this->table }}
    </div>

    {{-- Pending Influencers Section --}}
    <div class="space-y-4">
        <x-filament::section>
            <x-slot name="heading">
                Influencers Pendentes de Aprovação
            </x-slot>

            <x-slot name="description">
                Aguardando aceitação da associação
            </x-slot>

            @if($this->getPendingInfluencers()->count() > 0)
            <div class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 w-full p-0 dark:bg-gray-900 dark:ring-white/10 ">
                <div class="overflow-x-auto w-full p-0 m-0">
                    <table class="w-full table-auto divide-y divide-gray-200 dark:divide-white/10">
                        <thead class="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-950 dark:text-white">

                                </th>
                                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-950 dark:text-white">
                                    Nome
                                </th>
                                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-950 dark:text-white">
                                    Agência
                                </th>
                                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-950 dark:text-white">
                                    Criado em
                                </th>
                                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-950 dark:text-white">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-white/10 bg-white dark:bg-gray-900">
                            @foreach($this->getPendingInfluencers() as $influencer)
                            <tr class="hover:bg-gray-50 dark:hover:bg-white/5">
                                <td class="whitespace-nowrap px-3 py-4">
                                    @if($influencer->avatar_url)
                                    <img src="{{ $influencer->avatar_url }}"
                                        class="h-10 w-10 rounded-full object-cover"
                                        alt="{{ $influencer->name }}">
                                    @else
                                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {{ substr($influencer->name, 0, 1) }}
                                        </span>
                                    </div>
                                    @endif
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-950 dark:text-white">
                                    {{ $influencer->name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {{ $influencer->agency->name ?? '-' }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {{ $influencer->created_at->format('d/m/Y') }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm">
                                    <div class="flex items-center gap-3">
                                        <x-filament::button
                                            wire:click="approveInfluencer({{ $influencer->id }})"
                                            size="sm"
                                            color="success"
                                            icon="heroicon-o-check">
                                            Aprovar
                                        </x-filament::button>
                                        <x-filament::button
                                            wire:click="rejectInfluencer({{ $influencer->id }})"
                                            size="sm"
                                            color="danger"
                                            outlined
                                            icon="heroicon-o-x-mark">
                                            Rejeitar
                                        </x-filament::button>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            @else
            <div class="text-center py-12">
                <x-filament::icon
                    icon="heroicon-o-check-circle"
                    class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <h3 class="mt-2 text-sm font-semibold text-gray-950 dark:text-white">
                    Nenhum influencer pendente
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Todos os influencers foram processados.
                </p>
            </div>
            @endif
        </x-filament::section>
    </div>
</x-filament-panels::page>