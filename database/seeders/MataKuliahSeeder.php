<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MataKuliah;

class MataKuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MataKuliah::create([
            'kode_mk' => 'PAIK6101',
            'nama' => 'Matematika I',
            'sks' => 2,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6102',
            'nama' => 'Dasar Pemrograman',
            'sks' => 3,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6103',
            'nama' => 'Dasar Sistem',
            'sks' => 3,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6104',
            'nama' => 'Logika Informatika',
            'sks' => 3,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6105',
            'nama' => 'Struktur Diskrit',
            'sks' => 4,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6201',
            'nama' => 'Matematika II',
            'sks' => 2,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6202',
            'nama' => 'Algoritma dan Pemrograman',
            'sks' => 4,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6203',
            'nama' => 'Organisasi dan Arsitektur Komputer',
            'sks' => 3,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6204',
            'nama' => 'Aljabar Linear',
            'sks' => 3,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6301',
            'nama' => 'Struktur Data',
            'sks' => 4,
            'semester' => 3,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6302',
            'nama' => 'Sistem Operasi',
            'sks' => 3,
            'semester' => 3,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6303',
            'nama' => 'Basis Data',
            'sks' => 4,
            'semester' => 3,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6304',
            'nama' => 'Metode Numerik',
            'sks' => 3,
            'semester' => 3,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6305',
            'nama' => 'Interaksi Manusia dan Komputer',
            'sks' => 3,
            'semester' => 3,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6401',
            'nama' => 'Pemrograman Berorientasi Objek',
            'sks' => 3,
            'semester' => 4,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6402',
            'nama' => 'Jaringan Komputer',
            'sks' => 3,
            'semester' => 4,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6403',
            'nama' => 'Manajemen Basis Data',
            'sks' => 3,
            'semester' => 4,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6404',
            'nama' => 'Grafika dan Komputasi Visual',
            'sks' => 3,
            'semester' => 4,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6405',
            'nama' => 'Rekayasa Perangkat Lunak',
            'sks' => 3,
            'semester' => 4,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6406',
            'nama' => 'Sistem Cerdas',
            'sks' => 3,
            'semester' => 4,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6501',
            'nama' => 'Pengembangan Berbasis Platform',
            'sks' => 3,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6502',
            'nama' => 'Komputasi Tersebar dan Paralel',
            'sks' => 3,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6503',
            'nama' => 'Sistem Informasi',
            'sks' => 3,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6504',
            'nama' => 'Proyek Perangkat Lunak',
            'sks' => 3,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6505',
            'nama' => 'Pembelajaran Mesin',
            'sks' => 3,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6506',
            'nama' => 'Keamanan dan Jaminan Informasi',
            'sks' => 3,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6601',
            'nama' => 'Analisis dan Strategi Algoritma',
            'sks' => 3,
            'semester' => 6,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6602',
            'nama' => 'Uji Perangkat Lunak',
            'sks' => 3,
            'semester' => 6,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6603',
            'nama' => 'Masyarakat dan Etika Profesi',
            'sks' => 3,
            'semester' => 6,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6604',
            'nama' => 'Praktik Kerja Lapangan',
            'sks' => 3,
            'semester' => 6,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6605',
            'nama' => 'Manajemen Proyek',
            'sks' => 3,
            'semester' => 6,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6701',
            'nama' => 'Metodologi dan Penelitian Ilmiah',
            'sks' => 2,
            'semester' => 7,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6702',
            'nama' => 'Teori Bahasa dan Otomata',
            'sks' => 3,
            'semester' => 7,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'PAIK6801',
            'nama' => 'Skripsi',
            'sks' => 6,
            'semester' => 8,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00003',
            'nama' => 'Pancasila dan Kewarganegaraan',
            'sks' => 3,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00004',
            'nama' => 'Bahasa Indonesia',
            'sks' => 2,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00005',
            'nama' => 'Olahraga',
            'sks' => 1,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00006',
            'nama' => 'Internet of Things',
            'sks' => 2,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00007',
            'nama' => 'Bahasa Inggris',
            'sks' => 2,
            'semester' => 1,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00008',
            'nama' => 'Kuliah Kerja Nyata',
            'sks' => 3,
            'semester' => 7,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00009',
            'nama' => 'Kewirausahaan',
            'sks' => 2,
            'semester' => 5,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);
        MataKuliah::create([
            'kode_mk' => 'UNW00011',
            'nama' => 'Pendidikan Agama',
            'sks' => 2,
            'semester' => 2,
            'jenis' => 'Wajib',
            'id_prodi' => '62',
        ]);                
    }
}
