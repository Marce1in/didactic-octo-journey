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
                'avatar_url' => 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd1a3f4spazzrp4.cloudfront.net%2Fuber-com%2F1.1.8%2Fd1a3f4spazzrp4.cloudfront.net%2Fimages%2Ffacebook-shareimage-1-c3462391c9.jpg&f=1&nofb=1&ipt=2d5599fe5390a3a3ae3cf9936a3ef2fd2a1babb90ef970f18fb474e888b2fb90',
                'password' => Hash::make('senha123'),
                'role' => 'company',
                'email_verified_at' => now(),
            ]
        );

        User::create(
            [
                'name' => 'DSTA Agência',
                'email' => 'agencia@gmail.com',
                'avatar_url' => 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F406f50_1ce5ab12e3454874bf759aae5ad1076b~mv2.png%2Fv1%2Ffit%2Fw_2500%2Ch_1330%2Cal_c%2F406f50_1ce5ab12e3454874bf759aae5ad1076b~mv2.png&f=1&nofb=1&ipt=a6453220fedbc8472ccf93aa1cfb01979678e2cc686f8c3d0584a1256a8e0cb1',
                'password' => Hash::make('senha123'),
                'role' => 'agency',
                'email_verified_at' => now(),
            ]
        );

        User::create(
            [

                'name' => 'Influencer X',
                'email' => 'influencer@gmail.com',
                'avatar_url' => 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F712513%2Fpexels-photo-712513.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-andrea-piacquadio-712513.jpg%26fm%3Djpg&f=1&nofb=1&ipt=f774d5aac2166bfb772b1f294d80cc0e9d03f78f5d2ca7b1884d542ab71816f6',
                'password' => Hash::make('senha123'),
                'role' => 'influencer',
                'email_verified_at' => now(),
            ]
        );
    }
}
