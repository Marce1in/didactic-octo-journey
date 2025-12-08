<?php

namespace Database\Seeders;

use App\Models\Test;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::create(
            [
                'name' => 'Uber',
                'email' => 'empresa@gmail.com',
                'avatar' => null,
                'password' => Hash::make('senha123'),
                'role' => 'company',
                'email_verified_at' => now(),
            ]
        );

        User::create(
            [
                'name' => 'DSTA Agência',
                'email' => 'agencia@gmail.com',
                'avatar' => null,
                'password' => Hash::make('senha123'),
                'role' => 'agency',
                'email_verified_at' => now(),
            ]
        );

        User::create(
            [
                'name' => 'Influencer X',
                'email' => 'influencer@gmail.com',
                'avatar' => null,
                'password' => Hash::make('senha123'),
                'role' => 'influencer',
                'email_verified_at' => now(),
            ]
        );
    }
}
