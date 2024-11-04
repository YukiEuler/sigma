<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use App\Models\Dosen;
use App\Models\Fakultas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class BiayaController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
        $mahasiswa->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;
        
        $dosen = Dosen::where('nip', $mahasiswa->nip_dosen_wali)->first();
        $mahasiswa->nama_dosen = $dosen->nama;

        $angkatan = $mahasiswa->angkatan;
        $mahasiswa->semester = $this->hitungSemester($angkatan);

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Mahasiswa'){
            return redirect()->route('home');
        }

        return Inertia::render('(mahasiswa)/biaya/page', ['mahasiswa' => $mahasiswa]);
    }

    private function hitungSemester($angkatanMasuk)
    {
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        $yearDifference = $currentYear - $angkatanMasuk;

        // Tentukan tambahan semester berdasarkan bulan
        if ($currentMonth >= 9 || $currentMonth <= 2) {
            $additionalSemester = 1; // Semester Ganjil
        } else {
            $additionalSemester = 2; // Semester Genap
        }

        return (2 * $yearDifference) + $additionalSemester;
    }
}
