<?php

namespace App\Filament\Resources\CampaignAnnouncements\Schemas;

use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class CampaignAnnouncementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Group::make()->schema([
                    TextInput::make('name')
                        ->label('Nome da Campanha')
                        ->required(),

                    Select::make('product_id')
                        ->relationship(
                            'product',
                            'name',
                            fn($query) => $query->where('company_id', Auth::id())
                        )
                        ->label('Produto')
                        ->required()->createOptionForm([
                            TextInput::make('name')
                                ->required(),
                            TextInput::make('price')
                                ->numeric()
                                ->inputMode('decimal')->prefix('R$')
                                ->formatStateUsing(fn($state) => number_format($state / 100, 2, ',', '.'))
                                ->dehydrateStateUsing(fn($state) => (int) (str_replace(['.', ','], ['', '.'], $state) * 100))->required()
                                ->placeholder('0,00')
                                ->step('0.01')
                                ->required(),
                            MarkdownEditor::make('description')
                                ->nullable()->columnSpan(2),
                            Hidden::make('company_id')->default(Auth::id()),
                        ])
                        ->createOptionAction(
                            fn($action) => $action->modalHeading('Criar Produto')
                        ),

                    Select::make('category_id')
                        ->relationship(
                            'category',
                            'title',
                        )
                        ->label('Categoria')
                        ->required(),

                ]),

                Hidden::make('company_id')
                    ->default(Auth::id()),

                Section::make()->schema([
                    TextInput::make('agency_cut')
                        ->label('Porcentagem da Agência')
                        ->numeric()
                        ->required()
                        ->prefix('%')
                        ->inputMode('decimal')
                        ->maxValue(100)
                        ->minValue(0)
                        ->step('0.01')
                        ->placeholder('30,00'),

                    TextInput::make('budget')
                        ->label('Orçamento')
                        ->numeric()
                        ->inputMode('decimal')
                        ->prefix('R$')
                        ->placeholder('0,00'),

                ]),

                Repeater::make('attribute_values')
                    ->relationship()
                    ->label('Atributos Gerais')
                    ->default(function () {
                        return \App\Models\Attribute::with('values')->get()->map(function ($attribute) {
                            return [
                                'attribute_id' => $attribute->id,
                                'attribute' => $attribute,
                            ];
                        })->toArray();
                    })
                    ->table([
                        TableColumn::make('Atributo'),
                        TableColumn::make('Valor')->hiddenHeaderLabel(),
                    ])
                    ->compact()
                    ->schema([
                        Hidden::make('attribute_id'),

                        TextEntry::make('attribute.title')
                            ->label('Atributo'),

                        // Campo condicional: Select ou TextInput
                        Grid::make(2)
                            ->schema([
                                Select::make('id')
                                    ->hiddenLabel()
                                    ->options(
                                        fn(Get $get) =>
                                        \App\Models\Attribute::find($get('attribute_id'))
                                            ?->values()
                                            ->pluck('title', 'id') ?? []
                                    )
                                    ->searchable()
                                    ->preload()
                                    ->reactive()
                                    ->afterStateUpdated(function ($state, callable $set) {
                                        // Limpa o title quando muda a seleção
                                        if ($state) {
                                            $value = \App\Models\AttributeValue::find($state);
                                            if ($value && !in_array(strtolower($value->title), ['outro', 'outra', 'outros', 'outras'])) {
                                                $set('title', null);
                                            }
                                        }
                                    })
                                    ->visible(
                                        fn(Get $get) =>
                                        \App\Models\Attribute::find($get('attribute_id'))
                                            ?->values()
                                            ->exists() ?? false
                                    )->columnSpan(function (Get $get) {
                                        $attributeId = $get('attribute_id');

                                        $selectedId = $get('id');
                                        if ($selectedId) {
                                            $value = \App\Models\AttributeValue::find($selectedId);
                                            if ($value && in_array(strtolower($value->title), ['outro', 'outra', 'outros', 'outras'])) {
                                                return 1;
                                            }
                                        }

                                        return 2;
                                    }),

                                TextInput::make('title')
                                    ->hiddenLabel()
                                    ->placeholder('Especifique...')
                                    ->visible(function (Get $get) {
                                        $attributeId = $get('attribute_id');
                                        $attribute = \App\Models\Attribute::find($attributeId);

                                        // Se não tem valores pré-definidos, sempre mostra
                                        if (!$attribute || !$attribute->values()->exists()) {
                                            return true;
                                        }

                                        // Se tem valor selecionado, verifica se é "Outro/Outra"
                                        $selectedId = $get('id');
                                        if ($selectedId) {
                                            $value = \App\Models\AttributeValue::find($selectedId);
                                            if ($value && in_array(strtolower($value->title), ['outro', 'outra', 'outros', 'outras'])) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    })->columnSpan(function (Get $get) {
                                        $attributeId = $get('attribute_id');
                                        $attribute = \App\Models\Attribute::find($attributeId);

                                        if (!$attribute || !$attribute->values()->exists()) {
                                            return 2;
                                        }

                                        return 1;
                                    }),
                            ]),
                    ])
                    ->columnSpan(2)
                    ->addable(false)
                    ->deletable(false)
                    ->reorderable(false),

                MarkdownEditor::make('description')->label('Descrição')->columnSpan(2),
            ]);
    }
}
