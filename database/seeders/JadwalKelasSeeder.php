<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\JadwalKuliah;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;

class JadwalKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();
        $tanggal = [
            Carbon::create(1970, 1, 1, 7, 0, 0),
            Carbon::create(1970, 1, 1, 9, 40, 0),
            Carbon::create(1970, 1, 1, 13, 0, 0),
            Carbon::create(1970, 1, 1, 15, 40, 0)
        ];
        $pilihan_hari = [
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat'
        ];
        $mataKuliahs = \DB::table('mata_kuliah')
            ->get()
            ->groupBy('semester')
            ->map(function ($items) {
                return $items->toArray();
            })
            ->values()
            ->toArray();
        for ($tahun = 2020; $tahun <= 2024; $tahun++){
            foreach ($mataKuliahs as $mkSem) {
                $jadwalKelas = [
                    'A' => [],
                    'B' => [],
                    'C' => [],
                    'D' => [],
                ];
                foreach ($mkSem as $matkul){
                    $jadwalMk = [];
                    for ($kelas = 'A'; $kelas <= 'D'; $kelas++) {
                        $hari = $pilihan_hari[array_rand($pilihan_hari)];
                        $jam = $tanggal[array_rand($tanggal)];
                        while (in_array([$hari, $jam], $jadwalMk) || in_array([$hari, $jam], $jadwalKelas[$kelas])) {
                            $hari = $pilihan_hari[array_rand($pilihan_hari)];
                            $jam = $tanggal[array_rand($tanggal)];
                        }
                        $jadwalMk[] = [$hari, $jam];
                        $jadwalKelas[$kelas][] = [$hari, $jam];
                        $hasil = Kelas::create([
                            'kode_kelas' => $kelas,
                            'kode_mk' => $matkul->kode_mk,
                            'tahun' => $tahun,
                            'semester' => $matkul->semester,
                            'kuota' => 50,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                        $durasi = $matkul->sks * 50;
                        $selesai = $jam->copy()->addMinutes($durasi);

                        JadwalKuliah::create([
                            'hari' => $hari,
                            'waktu_mulai' => $jam->format('H:i:s'),
                            'waktu_selesai' => $selesai->format('H:i:s'),
                            'id_ruang' => $faker->numberBetween(1, 105),
                            'id_kelas' => $hasil->id,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        }
    }
}
