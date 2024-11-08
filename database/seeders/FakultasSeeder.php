<?php

namespace Database\Seeders;

use App\Models\Fakultas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FakultasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Fakultas::create([
            'id_fakultas' => 1,
            'nama_fakultas' => 'Fakultas Hukum'
        ]);

        Fakultas::create([
            'id_fakultas' => 2,
            'nama_fakultas' => 'Fakultas Ekonomika dan Bisnis'
        ]);

        Fakultas::create([
            'id_fakultas' => 3,
            'nama_fakultas' => 'Fakultas Ilmu Budaya'
        ]);

        Fakultas::create([
            'id_fakultas' => 4,
            'nama_fakultas' => 'Fakultas Ilmu Sosila dan Ilmu Politik'
        ]);

        Fakultas::create([
            'id_fakultas' => 5,
            'nama_fakultas' => 'Fakultas Kedokteran'
        ]);

        Fakultas::create([
            'id_fakultas' => 6,
            'nama_fakultas' => 'Fakultas Kesehatan Masyarakat'
        ]);

        Fakultas::create([
            'id_fakultas' => 7,
            'nama_fakultas' => 'Fakultas Perikanan dan Ilmu Kelautan'
        ]);

        Fakultas::create([
            'id_fakultas' => 8,
            'nama_fakultas' => 'Fakultas Peternakan dan Pertanian'
        ]);

        Fakultas::create([
            'id_fakultas' => 9,
            'nama_fakultas' => 'Fakultas Psikologi'
        ]);

        Fakultas::create([
            'id_fakultas' => 10,
            'nama_fakultas' => 'Fakultas Sains dan Matematika'
        ]);

        Fakultas::create([
            'id_fakultas' => 11,
            'nama_fakultas' => 'Fakultas Teknik'
        ]);

        Fakultas::create([
            'id_fakultas' => 12,
            'nama_fakultas' => 'Sekolah Vokasi'
        ]);

        Fakultas::create([
            'id_fakultas' => 13,
            'nama_fakultas' => 'Sekolah Pasca Sarjana'
        ]);
    }
}
