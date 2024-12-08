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
    
    // Hitung total mahasiswa aktif (perwalian)
    $totalMahasiswaAktif = Mahasiswa::where('nip_dosen_wali', '=', $dosen->nip)->count();
    
    if ($totalMahasiswaAktif === 0) {
        $allstudent = collect([]);
        $mahasiswaStats = [
            'total_aktif' => 0,
            'belum_isi_irs' => 0,
            'belum_disetujui' => 0,
            'sudah_disetujui' => 0
        ];
    } else {
        // Query untuk data IRS dan detail mahasiswa
        $allstudent = Mahasiswa::where('nip_dosen_wali', '=', $dosen->nip)
            ->leftJoin('irs', function ($join) use ($tahunAkademik) {
                $join->on('irs.nim', '=', 'mahasiswa.nim')
                     ->where('irs.tahun_akademik', '=', $tahunAkademik);
            })
            ->leftJoin('kelas', 'irs.id_kelas', '=', 'kelas.id')
            ->leftJoin('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->groupBy('mahasiswa.nim', 'mahasiswa.nama') 
            ->select(
                'mahasiswa.nim',
                'mahasiswa.nama',
                DB::raw('MAX(irs.id) as irs_id'),
                DB::raw('MAX(irs.tahun_akademik) as irs_tahun_akademik'),
                DB::raw('MAX(irs.is_verified) as is_verified'),
                DB::raw('MAX(irs.diajukan) as diajukan'),
                DB::raw('SUM(mata_kuliah.sks) as sks_diambil'),
                DB::raw('CASE 
                    WHEN MAX(irs.diajukan) = 0 OR MAX(irs.diajukan) IS NULL THEN "Not Submitted"
                    WHEN MAX(irs.is_verified) = 0 THEN "Not Approved"
                    WHEN MAX(irs.is_verified) = 1 THEN "Approved"
                    ELSE "Not Submitted"
                END as status_irs')
            )
            ->get();

        // Hitung statistik mahasiswa
        $mahasiswaStats = [
            'total_aktif' => $totalMahasiswaAktif,
            'belum_isi_irs' => $allstudent->filter(function ($item) {
                return $item->is_verified === null || $item->diajukan === 0;
            })->count(),
            'belum_disetujui' => $allstudent->filter(function ($item) {
                return $item->is_verified === 0 && $item->diajukan === 1;
            })->count(),
            'sudah_disetujui' => $allstudent->filter(function ($item) {
                return $item->is_verified === 1 && $item->diajukan === 1;
            })->count()
        ];
    }
    
    return Inertia::render('(dosen)/dashboard-dosen/page', [
        'dosen' => $dosen, 
        'allstudent' => $allstudent,
        'mahasiswaStats' => $mahasiswaStats
    ]);
}


}
