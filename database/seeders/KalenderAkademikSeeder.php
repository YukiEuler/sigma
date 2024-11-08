<?php

namespace Database\Seeders;

use App\Models\KalenderAkademik;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KalenderAkademikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KalenderAkademik::create([
            'id' => 20232,
            'tanggal_mulai' => '2023-07-17',
            'tanggal_selesai'=>'2023-12-20',
            'id_prodi'=> 62,
            'id_fakultas'=> 10,
            'tahun_akademik'=> '2023',
            'keterangan'=>'',
        ]);
        KalenderAkademik::create([
            'id' => 20241,
            'tanggal_mulai' => '2024-01-20',
            'tanggal_selesai'=>'2024-06-12',
            'id_prodi'=> 62,
            'id_fakultas'=> 10,
            'tahun_akademik'=> '2024',
            'keterangan'=>'',
        ]);
    }
}
