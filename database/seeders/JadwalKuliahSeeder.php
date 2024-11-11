<?php

namespace Database\Seeders;

use App\Models\JadwalKuliah;
use App\Models\Kelas;
use App\Models\MataKuliah;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class JadwalKuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menetapkan waktu mulai dan SKS untuk setiap jadwal
        $jadwalData = [
            //dasis
            [
                'id' => 1,
                'id_kelas' => 61031,
                'id_ruang' => '62',
                'hari' => 'Selasa',
                'waktu_mulai' => '15:40:00',
            ],
            [
                'id' => 2,
                'id_kelas' => 61032,
                'id_ruang' => '63',
                'hari' => 'Senin',
                'waktu_mulai' => '09:40:00',
            ],
            [
                'id' => 3,
                'id_kelas' => 61033,
                'id_ruang' => '62',
                'hari' => 'Senin',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 4,
                'id_kelas' => 61034,
                'id_ruang' => '62',
                'hari' => 'Senin',
                'waktu_mulai' => '13:00:00',
            ],
            [
                'id' => 5,
                'id_kelas' => 61035,
                'id_ruang' => '62',
                'hari' => 'Rabu',
                'waktu_mulai' => '07:00:00',
            ],
            //daspro
            [
                'id' => 6,
                'id_kelas' => 61021,
                'id_ruang' => '62',
                'hari' => 'Senin',
                'waktu_mulai' => '09:40:00',
            ],
            [
                'id' => 7,
                'id_kelas' => 61022,
                'id_ruang' => '63',
                'hari' => 'Selasa',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 8,
                'id_kelas' => 61023,
                'id_ruang' => '63',
                'hari' => 'Senin',
                'waktu_mulai' => '13:00:00',
            ],
            [
                'id' => 9,
                'id_kelas' => 61024,
                'id_ruang' => '63',
                'hari' => 'Selasa',
                'waktu_mulai' => '09:40:00',
            ],
            [
                'id' => 10,
                'id_kelas' => 61025,
                'id_ruang' => '62',
                'hari' => 'Senin',
                'waktu_mulai' => '15:40:00',
            ],
            //mat1
            [
                'id' => 11,
                'id_kelas' => 61011,
                'id_ruang' => '62',
                'hari' => 'Kamis',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 12,
                'id_kelas' => 61012,
                'id_ruang' => '97',
                'hari' => 'Senin',
                'waktu_mulai' => '16:30:00',
            ],
            [
                'id' => 13,
                'id_kelas' => 61013,
                'id_ruang' => '63',
                'hari' => 'Selasa',
                'waktu_mulai' => '16:30:00',
            ],
            [
                'id' => 14,
                'id_kelas' => 61014,
                'id_ruang' => '63',
                'hari' => 'Rabu',
                'waktu_mulai' => '10:30:00',
            ],
            [
                'id' => 15,
                'id_kelas' => 61015,
                'id_ruang' => '62',
                'hari' => 'Kamis',
                'waktu_mulai' => '13:00:00',
            ],
            //logif
            [
                'id' => 16,
                'id_kelas' => 61041,
                'id_ruang' => '97',
                'hari' => 'Kamis',
                'waktu_mulai' => '13:00:00',
            ],
            [
                'id' => 17,
                'id_kelas' => 61042,
                'id_ruang' => '97',
                'hari' => 'Rabu',
                'waktu_mulai' => '10:30:00',
            ],
            [
                'id' => 18,
                'id_kelas' => 61043,
                'id_ruang' => '97',
                'hari' => 'Selasa',
                'waktu_mulai' => '16:30:00',
            ],
            [
                'id' => 19,
                'id_kelas' => 61044,
                'id_ruang' => '97',
                'hari' => 'Senin',
                'waktu_mulai' => '16:30:00',
            ],
            [
                'id' => 20,
                'id_kelas' => 61045,
                'id_ruang' => '97',
                'hari' => 'Kamis',
                'waktu_mulai' => '07:00:00',
            ],
            //strukdis
            [
                'id' => 21,
                'id_kelas' => 61051,
                'id_ruang' => '63',
                'hari' => 'Rabu',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 22,
                'id_kelas' => 61052,
                'id_ruang' => '63',
                'hari' => 'Selasa',
                'waktu_mulai' => '13:00:00',
            ],
            [
                'id' => 23,
                'id_kelas' => 61053,
                'id_ruang' => '63',
                'hari' => 'Rabu',
                'waktu_mulai' => '13:00:00',
            ],
            [
                'id' => 24,
                'id_kelas' => 61054,
                'id_ruang' => '63',
                'hari' => 'Kamis',
                'waktu_mulai' => '13:00:00',
            ],
            [
                'id' => 25,
                'id_kelas' => 61055,
                'id_ruang' => '63',
                'hari' => 'Jumat',
                'waktu_mulai' => '13:00:00',
            ],
            //olahraga
            [
                'id' => 26,
                'id_kelas' => 51,
                'id_ruang' => '105',
                'hari' => 'Senin',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 27,
                'id_kelas' => 52,
                'id_ruang' => '63',
                'hari' => 'Selasa',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 28,
                'id_kelas' => 53,
                'id_ruang' => '63',
                'hari' => 'Rabu',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 29,
                'id_kelas' => 54,
                'id_ruang' => '63',
                'hari' => 'Kamis',
                'waktu_mulai' => '07:00:00',
            ],
            [
                'id' => 30,
                'id_kelas' => 55,
                'id_ruang' => '63',
                'hari' => 'Jumat',
                'waktu_mulai' => '07:00:00',
            ],
            //bing
            [
                'id' => 31,
                'id_kelas' => 71,
                'id_ruang' => '2',
                'hari' => 'Kamis',
                'waktu_mulai' => '10:50:00',
            ],
            [
                'id' => 32,
                'id_kelas' => 72,
                'id_ruang' => '2',
                'hari' => 'Kamis',
                'waktu_mulai' => '11:50:00',
            ],
            [
                'id' => 33,
                'id_kelas' => 73,
                'id_ruang' => '3',
                'hari' => 'Jumat',
                'waktu_mulai' => '10:40:00',
            ],
            [
                'id' => 34,
                'id_kelas' => 74,
                'id_ruang' => '2',
                'hari' => 'Kamis',
                'waktu_mulai' => '09:50:00',
            ],
            [
                'id' => 35,
                'id_kelas' => 75,
                'id_ruang' => '3',
                'hari' => 'Rabu',
                'waktu_mulai' => '15:50:00',
            ],
        ];

        foreach ($jadwalData as $data) {
            // Ambil mata kuliah berdasarkan id_kelas
            $kelas = Kelas::find($data['id_kelas']);
            $mataKuliah = $kelas->mataKuliah;

            // Hitung waktu selesai
            if ($mataKuliah) {
                // Durasi kuliah dalam menit berdasarkan SKS
                $durasiMenit = $mataKuliah->sks * 50;

                // Menghitung waktu selesai
                $waktuMulai = Carbon::createFromFormat('H:i:s', $data['waktu_mulai']);
                $waktuSelesai = $waktuMulai->copy()->addMinutes($durasiMenit);

                // Buat jadwal kuliah
                JadwalKuliah::create([
                    'id' => $data['id'],
                    'id_kelas' => $data['id_kelas'],
                    'id_ruang' => $data['id_ruang'],
                    'hari' => $data['hari'],
                    'waktu_mulai' => $waktuMulai->format('H:i:s'),
                    'waktu_selesai' => $waktuSelesai->format('H:i:s'),
                ]);
            }
        }
    }
}
