<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();
        $jalurMasukOptions = ['SBMPTN', 'SNMPTN', 'Mandiri'];
        $statusOptions = ['Aktif', 'Aktif', 'Aktif', 'Lulus', 'DO', 'Cuti'];

        for ($i = 0; $i < 100; $i++){
            $userMahasiswa = User::create([
                'username' => $faker->unique()->numerify('2406012#######'),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'Mahasiswa',
            ]);
    
            Mahasiswa::create([
                'nim' => $userMahasiswa->username,
                'nama' => $faker->name,
                'alamat' => $faker->address,
                'no_telp' => $faker->phoneNumber,
                'angkatan' => rand(2020, 2024),
                'jalur_masuk' => $jalurMasukOptions[array_rand($jalurMasukOptions)],
                'status' => $statusOptions[array_rand($statusOptions)],
                'sks_kumulatif' => rand(0,144),
                'semester' => rand(1, 8),
                'ipk' => $faker->randomFloat(2, 0, 4),
                'id_prodi' => 62,
                'nip_dosen_wali' => '197404011999031002',
                'user_id' => $userMahasiswa->id
            ]);
        }

        $user = User::create([
            'username' => '24060122120034',
            'email' => 'sunan@students.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Mahasiswa',
        ]);

        Mahasiswa::create([
            'nim' => $user->username,
            'nama' => 'Dzu Sunan Muhammad',
            'alamat' => $faker->address,
            'no_telp' => '085641626353',
            'angkatan' => 2023,
            'jalur_masuk' => 'SNMPTN',
            'status' => 'Aktif',
            'sks_kumulatif' => 45,
            'semester' => 3,
            'ipk' => 3.79,
            'id_prodi' => 62,
            'nip_dosen_wali' => '197404011999031002',
            'user_id' => $user->id
        ]);
    }
}
