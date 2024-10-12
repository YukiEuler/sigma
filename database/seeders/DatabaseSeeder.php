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
        $fakultas = Fakultas::create([
            'id_fakultas' => '1',
            'nama_fakultas' => 'Fakultas Ilmu Komputer',
        ]);

        $ProgramStudi = ProgramStudi::create([
            'id_prodi' => '1',
            'nama_prodi' => 'Informatika',
            'id_fakultas' => $fakultas->id_fakultas,
            'jenjang' => 'S1',
        ]);

        
        $userDosen = User::create([
            'username' => '197308291998022001',
            'email' => 'arispw@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        $userDekan = User::create([
            'username' => '197312202000121005',
            'email' => 'farikhin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        $userKaprodi = User::create([
            'username' => '197312202000121018',
            'email' => 'aris@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        $userBagianAkademik = User::create([
            'username' => '197312202000121001',
            'email' => 'beta@gmail.com', 
            'password' => Hash::make('password'),
            'role' => 'Bagian Akademik',
        ]);
        
        $userMahasiswa = User::create([
            'username' => '24060122120034',
            'email' => 'sunan@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'Mahasiswa',
        ]);

       
        Dosen::create([
            'nip' => $userDosen->username,
            'nama' => 'Aris Puji Widodo', 
            'alamat' => 'Jl. Raya Kedungwaru No. 1',
            'no_telp' => '081234567890',
            'id_prodi' => $ProgramStudi->id_prodi,
            'user_id' => $userDosen->id
        ]);

        Dosen::create([
            'nip' => $userDekan->username,
            'nama' => 'Farikhin', 
            'alamat' => 'Jl. Raya Kedungwaru No. 5',
            'no_telp' => '081234567291',
            'dekan' => true,
            'id_prodi' => $ProgramStudi->id_prodi,
            'user_id' => $userDekan->id
        ]);

        Dosen::create([
            'nip' => $userKaprodi->username,
            'nama' => 'Aris Sugiharto', 
            'alamat' => 'Jl. Raya Kedungwaru No. 7',
            'no_telp' => '081234567869',
            'kaprodi' => true,
            'id_prodi' => $ProgramStudi->id_prodi,
            'user_id' => $userKaprodi->id
        ]);

        BagianAkademik::create([
            'nip' => $userBagianAkademik->username,
            'nama' => 'Beta Noranita',
            'alamat' => 'Jl. Raya Kedungwaru No. 2',
            'no_telp' => '081234567891',
            'id_fakultas' => $fakultas->id_fakultas,
            'user_id' => $userBagianAkademik->id
        ]);

        Mahasiswa::create([
            'nim' => $userMahasiswa->username,
            'nama' => 'Dzu Sunan Muhammad',
            'alamat' => 'Jl. Raya Kedungwaru No. 3',
            'no_telp' => '081234567812',
            'angkatan' => 2022,
            'jalur_masuk' => 'SNMPTN',
            'sks_kumulatif' => 0,
            'ipk' => 0,
            'id_prodi' => $ProgramStudi->id_prodi,
            'nip_dosen_wali' => $userDosen->username,
            'user_id' => $userMahasiswa->id
        ]);
    }
}
