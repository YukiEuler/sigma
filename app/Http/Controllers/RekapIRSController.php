<?php

namespace App\Http\Controllers;

use App\Models\Khs;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use \App\Models\KalenderAkademik;

class RekapIRSController extends Controller
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

        $dateNow = now();
        $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
            ->whereDate('tanggal_mulai', '<=', $dateNow)
            ->whereDate('tanggal_selesai', '>=', $dateNow)
            ->first()->tahun_akademik;

        $mahasiswa = Mahasiswa::where('nip_dosen_wali', '=', $dosen->nip)
            ->leftJoin('irs', function ($join) use ($tahunAkademik) {
                $join->on('irs.nim', '=', 'mahasiswa.nim')
                     ->where('irs.tahun_akademik', '=', $tahunAkademik);
            })
            ->select(
                'mahasiswa.nim',
                'mahasiswa.nama',
                'mahasiswa.angkatan',
                'mahasiswa.ipk',
                'mahasiswa.semester',
                'mahasiswa.status',
                DB::raw('MAX(irs.id) as irs_id'),
                DB::raw('MAX(irs.tahun_akademik) as irs_tahun_akademik'),
                DB::raw('MAX(irs.is_verified) as is_verified'),
                DB::raw('MAX(irs.diajukan) as diajukan'), // Menyertakan diajukan
                DB::raw('(SELECT nama_prodi FROM program_studi WHERE program_studi.id_prodi = mahasiswa.id_prodi) as nama_prodi')
            )
            ->groupBy(
                'mahasiswa.nim',
                'mahasiswa.nama',
                'mahasiswa.id_prodi',
                'mahasiswa.angkatan',
                'mahasiswa.ipk',
                'mahasiswa.semester',
                'mahasiswa.status'
            )
            ->get();

        $mahasiswa->load(['irs' => function ($query) {
            $query->leftJoin('kelas', 'irs.id_kelas', '=', 'kelas.id')
              ->leftJoin('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
              ->select('irs.*', 'mata_kuliah.sks');
        }]);
        
        $ips = Khs::join('mahasiswa', 'khs.nim', '=', 'mahasiswa.nim')
            ->select(DB::raw('SUM(khs.bobot * CASE 
                WHEN khs.nilai_huruf = "A" THEN 4
                WHEN khs.nilai_huruf = "B" THEN 3
                WHEN khs.nilai_huruf = "C" THEN 2
                WHEN khs.nilai_huruf = "D" THEN 1
                ELSE 0
            END) / SUM(khs.bobot) as IPS'), 'mahasiswa.nim')
            ->where('mahasiswa.id_prodi', $dosen->id_prodi)
            ->whereRaw('khs.semester + 1 = mahasiswa.semester')
            ->groupBy('mahasiswa.nim')
            ->get();

        $mahasiswa->each(function ($mhs) use ($ips) {
            $mhsIps = $ips->firstWhere('nim', $mhs->nim);
            $mhs->ip_lalu = $mhsIps ? $mhsIps->IPS : 0;
            
            // Calculate total SKS being taken this semester
            $mhs->sks_kumulatif = $mhs->irs->where('diajukan', 1)->where('semester', $mhs->semester)->sum('sks') ?? 0;
            
            if ($mhs->irs->isEmpty() || $mhs->irs[0]->diajukan == 0){
                $mhs->status_irs = 'Not Submitted';
            } elseif ($mhs->irs[0]->disetujui == 0){
                $mhs->status_irs = 'Not Approved';
            } else {
                $mhs->status_irs = 'Approved';
            }
            if ($mhs->nim == '24060122120034') error_log($mhs);
        });

        $jumlahMahasiswa = Mahasiswa::where('nip_dosen_wali', $dosen->nip)->count();
        
        return Inertia::render('(dosen)/rekap-irs/page', [
            'dosen' => $dosen,
            'mahasiswa' => $mahasiswa,
            'jumlahMahasiswa' => $jumlahMahasiswa
        ]);
    }
}
