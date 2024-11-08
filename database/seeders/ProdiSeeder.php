<?php

namespace Database\Seeders;

use App\Models\ProgramStudi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProgramStudi::create([
            'id_prodi' => 1,
            'nama_prodi' => 'Hukum',
            'id_fakultas' => 1,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 2,
            'nama_prodi' => 'Hukum',
            'id_fakultas' => 1,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 3,
            'nama_prodi' => 'Kenotariatan',
            'id_fakultas' => 1,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 4,
            'nama_prodi' => 'Akuntansi',
            'id_fakultas' => 2,
            'jenjang' => 'S1',
        ]);

       
        ProgramStudi::create([
            'id_prodi' => 5,
            'nama_prodi' => 'Ilmu Ekonomi',
            'id_fakultas' => 2,
            'jenjang' => 'S1',
        ]);
        
        ProgramStudi::create([
            'id_prodi' => 6,
            'nama_prodi' => 'Manajemen',
            'id_fakultas' => 2,
            'jenjang' => 'S1',
        ]);
        
        ProgramStudi::create([
            'id_prodi' => 7,
            'nama_prodi' => 'Ekonomi Islam',
            'id_fakultas' => 2,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 8,
            'nama_prodi' => 'Bisnis Digital',
            'id_fakultas' => 2,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 9,
            'nama_prodi' => 'Akuntansi',
            'id_fakultas' => 2,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 10,
            'nama_prodi' => 'Ekonomi',
            'id_fakultas' => 2,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 11,
            'nama_prodi' => 'Manajemen',
            'id_fakultas' => 2,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 12,
            'nama_prodi' => 'Ekonomi',
            'id_fakultas' => 2,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 13,
            'nama_prodi' => 'Sastra Inggris',
            'id_fakultas' => 3,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 14,
            'nama_prodi' => 'Sastra Indonesia',
            'id_fakultas' => 3,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 15,
            'nama_prodi' => 'Sejarah',
            'id_fakultas' => 3,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 16,
            'nama_prodi' => 'Ilmu Perpustakaan',
            'id_fakultas' => 3,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 17,
            'nama_prodi' => 'Antropologi Sosial',
            'id_fakultas' => 3,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 18,
            'nama_prodi' => 'Bahasa dan Kebudayaan Jepang',
            'id_fakultas' => 3,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 19,
            'nama_prodi' => 'Ilmu Susastra',
            'id_fakultas' => 3,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 20,
            'nama_prodi' => 'Sejarah',
            'id_fakultas' => 3,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 21,
            'nama_prodi' => 'Linguistik',
            'id_fakultas' => 3,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 22,
            'nama_prodi' => 'Sejarah',
            'id_fakultas' => 3,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 23,
            'nama_prodi' => 'Administrasi Publik',
            'id_fakultas' => 4,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 24,
            'nama_prodi' => 'Administrasi Bisnis',
            'id_fakultas' => 4,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 25,
            'nama_prodi' => 'Ilmu Pemerintahan',
            'id_fakultas' => 4,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 26,
            'nama_prodi' => 'Ilmu Komunikasi',
            'id_fakultas' => 4,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 27,
            'nama_prodi' => 'Hubungan Internasional',
            'id_fakultas' => 4,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 28,
            'nama_prodi' => 'Administrasi Publik',
            'id_fakultas' => 4,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 29,
            'nama_prodi' => 'Administrasi Bisnis',
            'id_fakultas' => 4,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 30,
            'nama_prodi' => 'Ilmu Politik',
            'id_fakultas' => 4,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 31,
            'nama_prodi' => 'Ilmu Komunikasi',
            'id_fakultas' => 4,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 32,
            'nama_prodi' => 'Administrasi Publik',
            'id_fakultas' => 4,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 33,
            'nama_prodi' => 'Ilmu Sosial',
            'id_fakultas' => 4,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 34,
            'nama_prodi' => 'Kedokteran dan Profesi Dokter',
            'id_fakultas' => 5,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 35,
            'nama_prodi' => 'Ilmu Gizi dan Profesi Dietisien',
            'id_fakultas' => 5,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 36,
            'nama_prodi' => 'Keperawatan dan Profesi Ners',
            'id_fakultas' => 5,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 37,
            'nama_prodi' => 'Farmasi',
            'id_fakultas' => 5,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 38,
            'nama_prodi' => 'Kedokteran Gigi dan Profesi Dokter Gigi',
            'id_fakultas' => 5,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 39,
            'nama_prodi' => 'Ilmu Biomedik',
            'id_fakultas' => 5,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 40,
            'nama_prodi' => 'Ilmu Gizi',
            'id_fakultas' => 5,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 41,
            'nama_prodi' => 'Keperawatan',
            'id_fakultas' => 5,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 42,
            'nama_prodi' => 'Ilmu Kedokteran dan Kesehatan',
            'id_fakultas' => 5,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 43,
            'nama_prodi' => 'Kesehatan Masyarakat',
            'id_fakultas' => 6,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 44,
            'nama_prodi' => 'Keselamatan dan Kesehatan Kerja',
            'id_fakultas' => 6,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 45,
            'nama_prodi' => 'Epidemiologi',
            'id_fakultas' => 6,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 46,
            'nama_prodi' => 'Kesehatan Masyarakat',
            'id_fakultas' => 6,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 47,
            'nama_prodi' => 'Kesehatan Lingkungan',
            'id_fakultas' => 6,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 48,
            'nama_prodi' => 'Promosi Kesehatan',
            'id_fakultas' => 6,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 49,
            'nama_prodi' => 'Kesehatan Masyarakat',
            'id_fakultas' => 6,
            'jenjang' => 'S3',
        ]);

        ProgramStudi::create([
            'id_prodi' => 50,
            'nama_prodi' => 'Akuakultur',
            'id_fakultas' => 7,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 51,
            'nama_prodi' => 'Ilmu Kelautan',
            'id_fakultas' => 7,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 52,
            'nama_prodi' => 'Manajemen Sumberdaya Perairan',
            'id_fakultas' => 7,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 53,
            'nama_prodi' => 'Oseanografi',
            'id_fakultas' => 7,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 54,
            'nama_prodi' => 'Perikanan Tangkap',
            'id_fakultas' => 7,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 55,
            'nama_prodi' => 'Hasil Perikanan',
            'id_fakultas' => 7,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 56,
            'nama_prodi' => 'Matematika',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 57,
            'nama_prodi' => 'Biologi',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 58,
            'nama_prodi' => 'Kimia',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 59,
            'nama_prodi' => 'Fisika',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 60,
            'nama_prodi' => 'Statistika',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 61,
            'nama_prodi' => 'Bioteknologi',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 62,
            'nama_prodi' => 'Informatika',
            'id_fakultas' => 10,
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'id_prodi' => 63,
            'nama_prodi' => 'Matematika',
            'id_fakultas' => 10,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 64,
            'nama_prodi' => 'Biologi',
            'id_fakultas' => 10,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 65,
            'nama_prodi' => 'Kimia',
            'id_fakultas' => 10,
            'jenjang' => 'S2',
        ]);

        ProgramStudi::create([
            'id_prodi' => 66,
            'nama_prodi' => 'Fisika',
            'id_fakultas' => 10,
            'jenjang' => 'S2',
        ]);
    }
}
