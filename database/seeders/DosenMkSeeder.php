<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\MataKuliah;
use App\Models\DosenMk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DosenMkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dosen = Dosen::all();
        $mataKuliah = MataKuliah::all();
        for ($tahun = 2020; $tahun <= 2024; $tahun++){
            foreach ($mataKuliah as $mk) {
                $dosen1 = $dosen->random();
                $dosen2 = $dosen->where('nip', '!=', $dosen1->nip)->random();

                DosenMk::create([
                    'nip' => $dosen1->nip,
                    'kode_mk' => $mk->kode_mk,
                    'tahun_akademik' => ''.$tahun.'-'.($mk->semester % 2 + 1),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                DosenMk::create([
                    'nip' => $dosen2->nip,
                    'kode_mk' => $mk->kode_mk,
                    'tahun_akademik' => ''.$tahun.'-'.($mk->semester % 2 + 1),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}