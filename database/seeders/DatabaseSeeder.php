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
                'name' => 'empresa',
                'email' => 'empresa@gmail.com',
                'password' => Hash::make('senha123'),
                'role' => 'company',
                'email_verified_at' => now(),
            ]
        );

        User::create(
            [
                'name' => 'agency',
                'email' => 'agency@gmail.com',
                'password' => Hash::make('senha123'),
                'role' => 'agency',
                'email_verified_at' => now(),
            ]
        );

        User::create(
            [
                'name' => 'influencer',
                'email' => 'influencer@gmail.com',
                'password' => Hash::make('senha123'),
                'role' => 'influencer',
                'email_verified_at' => now(),
            ]
        );
    }
}
