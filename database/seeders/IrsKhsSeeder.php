<?php

namespace Database\Seeders;
use App\Models\Mahasiswa;
use App\Models\Irs;
use App\Models\Khs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IrsKhsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mahasiswas = Mahasiswa::all();
        $kelasData = \DB::table('kelas')
            ->join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->select('kelas.*', 'mata_kuliah.*')
            ->get();
        foreach ($mahasiswas as $mahasiswa) {
            $kelas = chr(rand(65, 68));
            $semester = 1;
            $tahun = $mahasiswa->angkatan;
            while ($semester < $mahasiswa->semester){
                $periode = $semester % 2 + 1;
                $tahun_akademik = ''.$tahun.'-'.$periode;
                $filteredKelasData = $kelasData->where('semester', $semester)->where('tahun', $tahun)->where('kode_kelas', $kelas);
                foreach ($filteredKelasData as $kelasItem) {
                    Irs::create([
                        'id_kelas' => $kelasItem->id,
                        'semester' => $semester,
                        'tahun_akademik' => $tahun_akademik,
                        'status' => 'Baru',
                        'nim' => $mahasiswa->nim,
                        'is_verified' => 1,
                        'diajukan' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $bobot = ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'E'];
                    Khs::create([
                        'nim' => $mahasiswa->nim,
                        'kode_mk' => $kelasItem->kode_mk,
                        'tahun' => $tahun,
                        'semester' => $semester,
                        'status' => 'Baru',
                        'nilai_huruf' => $bobot[array_rand($bobot)],
                        'bobot' => $kelasItem->sks,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
                $semester++;
                if ($semester % 2 == 0) $tahun++;
            }
        }
    }
}
