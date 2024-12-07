<?php

namespace Database\Seeders;

use App\Models\KalenderAkademik;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KalenderAkademikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kalender_akademik')->truncate();
        KalenderAkademik::create([
            'id' => 20232,
            'tanggal_mulai' => '2023-07-17',
            'tanggal_selesai'=>'2023-12-20',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2023-2',
            'keterangan'=>'Periode Tahun Akademik',
        ]);
        KalenderAkademik::create([
            'id' => 20241,
            'tanggal_mulai' => '2024-01-20',
            'tanggal_selesai'=>'2024-06-12',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-1',
            'keterangan'=>'Periode Tahun Akademik',
        ]);
        KalenderAkademik::create([
            'id' => 20242,
            'tanggal_mulai' => '2024-08-09',
            'tanggal_selesai'=>'2024-12-27',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-2',
            'keterangan'=>'Periode Tahun Akademik',
        ]);
        KalenderAkademik::create([
            'tanggal_mulai' => '2024-12-01',
            'tanggal_selesai'=>'2024-12-20',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-2',
            'keterangan'=>'Pengisian IRS Periode 1',
        ]);
        KalenderAkademik::create([
            'tanggal_mulai' => '2024-12-21',
            'tanggal_selesai'=>'2024-12-31',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-2',
            'keterangan'=>'Pengisian IRS Periode 2',
        ]);
        KalenderAkademik::create([
            'tanggal_mulai' => '2024-08-19',
            'tanggal_selesai'=>'2024-12-06',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-2',
            'keterangan'=>'Masa Kuliah',
        ]);
        KalenderAkademik::create([
            'tanggal_mulai' => '2025-01-01',
            'tanggal_selesai'=>'2025-01-15',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-2',
            'keterangan'=>'Periode Penggantian',
        ]);
        KalenderAkademik::create([
            'tanggal_mulai' => '2025-01-16',
            'tanggal_selesai'=>'2025-01-31',
            'id_prodi'=> NULL,
            'id_fakultas'=> NULL,
            'tahun_akademik'=> '2024-2',
            'keterangan'=>'Periode Pembatalan',
        ]);
    }
}