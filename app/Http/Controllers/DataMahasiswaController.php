<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataMahasiswaController extends Controller
{
    public function index()
    {
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

        // $mahasiswa = Mahasiswa::where('id_prodi', $dosen->id_prodi)->get();
        $mahasiswa = Mahasiswa::where('id_prodi', $dosen->id_prodi)
                          ->with('dosen')
                          ->get();

        return Inertia::render('(kaprodi)/data-mahasiswa/page', ['dosen' => $dosen, 'mahasiswa' => $mahasiswa]);
    }

}
