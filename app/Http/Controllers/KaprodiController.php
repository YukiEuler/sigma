<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class KaprodiController extends Controller
{
    public function index(){    
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }
        
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;

        // Mengambil data mahasiswa berdasarkan prodi
        $mahasiswa = Mahasiswa::where('id_prodi', $dosen->id_prodi);
        
        // Menghitung total mahasiswa
        $totalMahasiswa = $mahasiswa->count();
        
        // Menghitung jumlah mahasiswa berdasarkan status
        $mahasiswaAktif = Mahasiswa::where('id_prodi', $dosen->id_prodi)->where('status', 'Aktif')->count();
        $mahasiswaCuti = Mahasiswa::where('id_prodi', $dosen->id_prodi)->where('status', 'Cuti')->count();
        $mahasiswaDO = Mahasiswa::where('id_prodi', $dosen->id_prodi)->where('status', 'DO')->count();
        $mahasiswaLulus = Mahasiswa::where('id_prodi', $dosen->id_prodi)->where('status', 'Lulus')->count();

        return Inertia::render('(kaprodi)/dashboard-kaprodi/page', [
            'dosen' => $dosen, 
            'mahasiswa' => [
                'total' => $totalMahasiswa,
                'aktif' => $mahasiswaAktif,
                'cuti' => $mahasiswaCuti,
                'do' => $mahasiswaDO,
                'lulus' => $mahasiswaLulus
            ]
        ]);
    }
}
