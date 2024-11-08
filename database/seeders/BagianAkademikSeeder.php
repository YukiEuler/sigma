<?php

namespace Database\Seeders;

use App\Models\BagianAkademik;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class BagianAkademikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $user = User::create([
            'username' => '198106202015041003',
            'email' => 'rudolf@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Bagian Akademik'
        ]);

        BagianAkademik::create([
            'nip' => $user->username,
            'nama' => "Yesaya Rudolf",
            'alamat' => $faker->address(),
            'no_telp' => $faker->phoneNumber(),
            'user_id' => $user->id,
            'id_fakultas' => 10,
        ]);
    }
}
