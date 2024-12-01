<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KHSController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Mahasiswa'){
            return redirect()->route('home');
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
        $mahasiswa->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', operator: $programStudi->id_fakultas)->first();
        $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;

        // $sksk = Khs::where('nim', $mahasiswa->nim)->sum('bobot');
        // $mahasiswa->sksk = $sksk;
        // $mahasiswa->nama_dosen_wali = Dosen::where('nip', $mahasiswa->nip_dosen_wali)->value('nama');

        // $dateNow = now();
        // $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
        //     ->whereDate('tanggal_mulai', '<=', $dateNow)
        //     ->whereDate('tanggal_selesai', '>=', $dateNow)
        //     ->first();
        // $tahunAkademikSplit = explode('-', $tahunAkademik->tahun_akademik);
        // $tahun = (int) $tahunAkademikSplit[0];
        // $periode = (int) $tahunAkademikSplit[1] % 2;
        // $semester = $periode % 2 == 0 ? "Ganjil" : "Genap";
        // $mahasiswa->tahun_akademik = ''.($tahun-$periode).'/'.($tahun-$periode+1).' '.$semester;
        return Inertia::render('(mahasiswa)/khs/page', ['mahasiswa' => $mahasiswa]);
    }
}
