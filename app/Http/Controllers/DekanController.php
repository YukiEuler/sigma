<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use \App\Models\Dosen;
use \App\Models\ProgramStudi;
use \App\Models\Fakultas;
use App\Models\Ruangan;
use App\Models\KalenderAkademik;

class DekanController extends Controller
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
        // $id_fakultas = $dosen->id_fakultas;

        $id_fakultas = ProgramStudi::where('id_prodi', $dosen->id_prodi)->value('id_fakultas');

        // Get the rooms where id_fakultas matches the user's id_fakultas
        $ruangan = Ruangan::where('id_fakultas', $id_fakultas)->get();
    
        // Sort the rooms by 'nama_ruang'
        $ruangan = $ruangan->sortBy('nama_ruang');
        // Join ruangan with ProgramStudi where id_prodi matches
        $ruangan = $ruangan->map(callback: function ($room) {
            $programStudi = ProgramStudi::where('id_prodi', $room->id_prodi)->first();
            $room->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;
            return $room;
        })->values()->all();

        $dateNow = now();
        $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
            ->whereDate('tanggal_mulai', '<=', $dateNow)
            ->whereDate('tanggal_selesai', '>=', $dateNow)
            ->first()->tahun_akademik;

        
        
        $programStudiList = DB::table('kelas')
            ->leftJoin('mata_kuliah', function ($join) use ($tahunAkademik) {
                $join->on('mata_kuliah.kode_mk', '=', 'kelas.kode_mk')
                    ->where('kelas.tahun_akademik', '=', $tahunAkademik);
            })
            ->leftJoin('program_studi', 'program_studi.id_prodi', '=', 'mata_kuliah.id_prodi')
            ->select('program_studi.id_prodi', 'program_studi.nama_prodi', 
                DB::raw('COUNT(DISTINCT mata_kuliah.kode_mk) as total_mk'),
                DB::raw('COUNT(DISTINCT CASE WHEN kelas.status = "disetujui" THEN kelas.kode_mk END) as disetujui'))
            ->where('program_studi.id_fakultas', $fakultas->id_fakultas)
            ->groupBy('program_studi.id_prodi', 'program_studi.nama_prodi')
            ->get();

        return Inertia::render('(dekan)/dashboard-dekan/page', 
        [
            'ruangan' => $ruangan,
            'dosen' => $dosen,
            'jadwal' => $programStudiList]);
    }
}
