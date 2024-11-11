<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\BagianAkademik;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            FakultasSeeder::class,
            ProdiSeeder::class,
            DosenSeeder::class,
            MahasiswaSeeder::class,
            RuanganSeeder::class,
            MataKuliahSeeder::class,
            JadwalKelasSeeder::class,
            IrsKhsSeeder::class,
            KalenderAkademikSeeder::class,
            BagianAkademikSeeder::class,
        ]);
    }
}
