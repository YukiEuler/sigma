<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use \App\Models\KalenderAkademik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use \App\Models\Dosen;
use \App\Models\ProgramStudi;
use \App\Models\Fakultas;
use App\Models\Mahasiswa;

class DosenController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;
        $dateNow = now();
        $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
            ->whereDate('tanggal_mulai', '<=', $dateNow)
            ->whereDate('tanggal_selesai', '>=', $dateNow)
            ->first()->tahun_akademik;
        $allstudent = Mahasiswa::where('nip_dosen_wali', '=', $dosen->nip)
            ->leftJoin('irs', function ($join) use ($tahunAkademik) {
                $join->on('irs.nim', '=', 'mahasiswa.nim')
                     ->where('irs.tahun_akademik', '=', $tahunAkademik);
            })
            ->groupBy('mahasiswa.nim') // Mengelompokkan berdasarkan 'nim'
            ->select(
                'mahasiswa.*',
                DB::raw('MAX(irs.id) as irs_id'),
                DB::raw('MAX(irs.tahun_akademik) as irs_tahun_akademik'),
                DB::raw('MAX(irs.is_verified) as is_verified'), // Menyertakan is_verified
                DB::raw('MAX(irs.diajukan) as diajukan') // Menyertakan diajukan
            )
            ->get();
        
        error_log ($allstudent);
        return Inertia::render('(dosen)/dashboard-dosen/page', ['dosen' => $dosen, 'allstudent' => $allstudent]);
    }


}
