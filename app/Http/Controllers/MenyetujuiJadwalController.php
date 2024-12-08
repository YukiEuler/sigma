<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\KalenderAkademik;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $jadwal = DB::table('jadwal_kuliah')
            ->join('kelas', 'jadwal_kuliah.id_kelas', '=', 'kelas.id_kelas')
            ->join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->where('mata_kuliah.id_prodi', '=', $selectedProdi->id_prodi)
            ->select('jadwal_kuliah.*', 'kelas.nama_kelas', 'mata_kuliah.nama as nama_mk', 'mata_kuliah.sks')
            ->get();
    
        return Inertia::render('(dekan)/setujui-jadwal/detail', [
            'dosen' => $dosen,
            'selectedProdi' => $selectedProdi,
            'jadwal' => $jadwal
        ]);
    }

    public function approveJadwal($id_prodi)
    {
        $id = $id_prodi;
        // $dateNow = now();
        // $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
        //     ->whereDate('tanggal_mulai', '<=', $dateNow)
        //     ->whereDate('tanggal_selesai', '>=', $dateNow)
        //     ->first()->tahun_akademik;

        
            $mataKuliah = MataKuliah::where('id_prodi', $id)
                ->pluck('kode_mk');

            DB::table('kelas')
                ->whereIn('kode_mk', $mataKuliah)
                // ->where('tahun_akademik', $tahunAkademik)
                ->update(['status' => 'disetujui']);
        

        return redirect()->back();
    }
}
