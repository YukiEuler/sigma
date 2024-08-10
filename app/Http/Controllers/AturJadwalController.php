<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalKuliah;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\ProgramStudi;
use App\Models\KalenderAkademik;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AturJadwalController extends Controller
{
    // public function index(){    
    //     $user = Auth::user();

    //     if (!$user) {
    //         return redirect()->route('login');
    //     } elseif ($user->role !== 'Dosen'){
    //         return redirect()->route('home');
    //     }

    //     $dosen = Dosen::where('user_id', $user->id)->get()->first();
    //     $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
    //     $dosen->nama_prodi = $programStudi->nama_prodi;
    //     $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
    //     $dosen->nama_fakultas = $fakultas->nama_fakultas;
    //     return Inertia::render('(kaprodi)/atur-jadwal/page', ['dosen' => $dosen]);
    // }
    
    public function create()
    {
        $user = Auth::user();
        $kaprodi = Dosen::where('user_id', $user->id)->get()->first();
        $tahunAkademik = KalenderAkademik::getTahunAkademik();

        // Mengambil data dosen, mata kuliah, dan kelas
        $dosen = Dosen::where('id_prodi', $kaprodi->id_prodi)->get(['nip', 'nama']);
        $mataKuliah = MataKuliah::where('id_prodi', $kaprodi->id_prodi)->get(['kode_mk', 'nama', 'sks']);
        $kelas = Kelas::join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->where('id_prodi', '=', $kaprodi->id_prodi)
            ->get(['kelas.id', 'kelas.kode_kelas', 'mata_kuliah.nama as nama_mata_kuliah']);
        $jadwalKuliah = Kelas::join('jadwal_kuliah', 'kelas.id', '=', 'jadwal_kuliah.id_kelas')
            ->whereIn('kelas.id', $kelas->pluck('id'))
            ->get(['kelas.id', 'kelas.kode_kelas', 'jadwal_kuliah.hari', 'jadwal_kuliah.waktu_mulai', 'jadwal_kuliah.waktu_selesai']);

        return Inertia::render('(kaprodi)/atur-jadwal/page', [
            'dosen' => $dosen,
            'mataKuliah' => $mataKuliah,
            'kelas' => $kelas,
            'jadwalKuliah' => $jadwalKuliah,
        ]);
    }

    public function store(Request $request)
    {
        dd($request->all());

        $request->validate([
            'tahun_akademik' => 'required|string',
            'hari' => 'required|string',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i|after:waktu_mulai',
            'id_ruang' => 'required|string|exists:ruangan,id_ruang',
            'id_kelas' => 'required|exists:kelas,id',
            'id_dosen' => 'required|exists:dosen,nip',
            'kode_mk' => 'required|exists:mata_kuliah,kode_mk',
        ]);

        // Simpan data jadwal ke database
        JadwalKuliah::create([
            //'tahun_akademik' => $request->tahun_akademik,
            //'id_kelas' => $request->id_kelas,
            'hari' => $request->hari,
            'id_ruang' => $request->id_ruang,
            'waktu_mulai' => $request->waktu_mulai,
            'waktu_selesai' => $request->waktu_selesai,
            //'id_dosen' => $request->id_dosen,
            //'kode_mk' => $request->kode_mk,
        ]);



        return redirect()->route('kaprodi.aturJadwal')->with('message', 'Jadwal berhasil ditambahkan.');
    }
}
