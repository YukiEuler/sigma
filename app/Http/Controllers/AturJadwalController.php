<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalKuliah;
use App\Models\Dosen;
use App\Models\DosenKelas;
use App\Models\DosenKelasModel;
use App\Models\DosenMk;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\ProgramStudi;
use App\Models\KalenderAkademik;
use App\Models\Ruangan;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AturJadwalController extends Controller
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

        $mataKuliah = MataKuliah::where('id_prodi', $dosen->id_prodi)
        ->select('kode_mk', 'nama', 'sks', 'semester')
        ->get();

        $listDosen = Dosen::where('id_prodi', $dosen->id_prodi)
        ->select('nip', 'nama')
        ->get();

        $ruangan = Ruangan::where('id_prodi', $dosen->id_prodi)
        ->where('diajukan', 1)
        ->where('disetujui', 1)
        ->select('id_ruang', 'nama_ruang')
        ->get();

        return Inertia::render('(kaprodi)/atur-jadwal/page', ['dosen' => $dosen, 'mataKuliah' => $mataKuliah, 'listDosen' => $listDosen, 'ruangan' => $ruangan]);
    }
}
