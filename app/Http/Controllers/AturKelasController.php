<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Kelas;
use App\Models\Fakultas;
use App\Models\KalenderAkademik;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AturKelasController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Jika tidak ada user yang terautentikasi, redirect ke halaman login
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        $tahun = KalenderAkademik::getTahunAkademik();

        // Mendapatkan data dosen berdasarkan user ID
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;
        
        // Mengambil semua data mata kuliah dari database
        $mataKuliah = MataKuliah::where('id_prodi', $dosen->id_prodi)
            ->with(['kelas' => function ($query) use ($tahun) {
            $query->where('tahun_akademik', $tahun);
            }])
            ->with(['dosenMk' => function ($query) use ($tahun) {
                $query->where('tahun_akademik', $tahun);
                }])
            ->get();
        foreach ($mataKuliah as $mk) {
            foreach ($mk->dosenMk as $dosenMk) {
                $dosen = Dosen::where('nip', $dosenMk->nip)->first();
                $dosenMk->nama = $dosen ? $dosen->nama : null;
            }
        }

        error_log($mataKuliah);
        
        $listDosen = Dosen::where('id_prodi', $dosen->id_prodi)
        ->select('nip', 'nama')
        ->get();

        // Mengirim data ke komponen React melalui Inertia
        return Inertia::render('(kaprodi)/atur-kelas/page', [
            'mataKuliah' => $mataKuliah,
            'dosen' => $dosen,
            'listDosen' => $listDosen
        ]);
    }

    public function tambah(Request $request)
    {
        $user = Auth::user();

        $tahun_akademik = KalenderAkademik::getTahunAkademik();

        // Mendapatkan data dosen berdasarkan user ID
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;

        $kode_mk = $request['kode_mk'];
        $banyak = (int) $request['banyak'];

        $kelas = MataKuliah::where('id_prodi', $dosen->id_prodi)
            ->where('kode_mk', $kode_mk)
            ->with(['kelas' => function ($query) use ($tahun_akademik) {
            $query->where('tahun_akademik', $tahun_akademik)
                  ->orderBy('kode_kelas');
            }])
            ->get();
        $start = ord($kelas->pluck('kelas')->flatten()->max('kode_kelas') ?: '@') + 1;
        for ($i = 0; $i < $banyak; $i++) {
            Kelas::create([
                'kode_kelas' => chr($start + $i),
                'kode_mk' => $kode_mk,
                'tahun_akademik' => $tahun_akademik,
                'kuota' => 1
            ]);
        }
    }
}