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

        $dateNow = now();
        $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
            ->whereDate('tanggal_mulai', '<=', $dateNow)
            ->whereDate('tanggal_selesai', '>=', $dateNow)
            ->first()->tahun_akademik;

        $kelas = DB::table('kelas')
            ->select('kode_mk', 'status')
            ->groupBy('kode_mk', 'status')
            ->where('tahun_akademik', $tahunAkademik)
            ->get();
        
        $programStudiList = DB::table('program_studi')
            ->leftJoin('mata_kuliah', 'program_studi.id_prodi', '=', 'mata_kuliah.id_prodi')
            ->leftJoin('kelas', 'mata_kuliah.kode_mk', '=', 'kelas.kode_mk')
            ->select('program_studi.id_prodi', 'program_studi.nama_prodi', 
                DB::raw('COUNT(DISTINCT mata_kuliah.kode_mk) as total_mk'),
                DB::raw('COUNT(DISTINCT CASE WHEN kelas.status = "disetujui" THEN kelas.kode_mk END) as disetujui'))
            ->where('program_studi.id_fakultas', $fakultas->id_fakultas)
            ->groupBy('program_studi.id_prodi', 'program_studi.nama_prodi')
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
            ->join('kelas', 'jadwal_kuliah.id_kelas', '=', 'kelas.id')
            ->join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->where('mata_kuliah.id_prodi', '=', $selectedProdi->id_prodi)
            ->select('jadwal_kuliah.*', 'kelas.kode_kelas', 'mata_kuliah.nama as nama_mk', 'mata_kuliah.sks')
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
