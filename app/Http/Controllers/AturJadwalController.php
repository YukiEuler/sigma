<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalKuliah;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\ProgramStudi;
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
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
    
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        // Mengambil data dosen, mata kuliah, dan kelas
        $dosen = Dosen::all(['nip', 'nama']);
        $mataKuliah = MataKuliah::all(['kode_mk', 'nama', 'sks']);
        $kelas = Kelas::all(['id', 'kode_kelas']);
        $jadwalKuliah = JadwalKuliah::all(); // Ambil semua jadwal kulia

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
