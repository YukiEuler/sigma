<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenyetujuiJadwalController extends Controller
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

        $mataKuliah = MataKuliah::where('id_prodi', $dosen->id_prodi)
        ->select('kode_mk', 'nama', 'sks', 'semester')
        ->get();

        $ruangan = Ruangan::where('id_prodi', $dosen->id_prodi)
        ->where('diajukan', 1)
        ->where('disetujui', 1)
        ->select('id_ruang', 'nama_ruang')
        ->get();

        $programStudiList = ProgramStudi::select('id_prodi', 'nama_prodi')
        ->where('id_fakultas', $fakultas->id_fakultas)
        ->get();

        return Inertia::render('(dekan)/setujui-jadwal/page', 
        [
            'dosen' => $dosen, 'mataKuliah' => $mataKuliah, 'ruangan' => $ruangan, 'programStudiList' => $programStudiList]);
    }

    public function detail($id_prodi)
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
    
        // Ambil detail program studi yang dipilih
        $selectedProdi = ProgramStudi::where('id_prodi', $id_prodi)->first();
    
        return Inertia::render('(dekan)/setujui-jadwal/detail', [
            'dosen' => $dosen,
            'selectedProdi' => $selectedProdi
        ]);
    }

    
}
