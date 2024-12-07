<?php

namespace App\Http\Controllers;

use App\Models\Khs;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use App\Models\KalenderAkademik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataMahasiswaController extends Controller
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
        $tahun_akademik = KalenderAkademik::getTahunAkademik();
        // $mahasiswa = Mahasiswa::where('id_prodi', $dosen->id_prodi)->get();

        $mahasiswa = Mahasiswa::where('id_prodi', $dosen->id_prodi)
            ->with(['dosen', 'irs' => function ($query) use ($tahun_akademik) {
                $query->where('tahun_akademik', $tahun_akademik);
            }])
            ->get();
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
            $mhs->ip_lalu = $mhsIps ? $mhsIps->IPS : null;
            if ($mhs->irs->isEmpty() || $mhs->irs[0]->diajukan == 0){
                $mhs->status_irs = 'Belum Diajukan';
            } elseif ($mhs->irs[0]->disetujui == 0){
                $mhs->status_irs = 'Belum Disetujui';
            } else {
                $mhs->status_irss = 'Sudah Disetujui';
            }
        });
        error_log($mahasiswa);

        return Inertia::render('(kaprodi)/data-mahasiswa/page', ['dosen' => $dosen, 'mahasiswa' => $mahasiswa]);
    }

    public function detail($id){
        $user = Auth::user();

    if (!$user) {
        return redirect()->route('login');
    } elseif ($user->role !== 'Dosen'){
        return redirect()->route('home');
    }

    $mahasiswa = Mahasiswa::where('nim', $id)->first();
    if (!$mahasiswa) {
        return redirect()->route('home')->with('error', 'Mahasiswa tidak ditemukan');
    }

    $dosen = Dosen::where('user_id', $user->id)->first();
    if (!$dosen) {
        return redirect()->route('home')->with('error', 'Dosen tidak ditemukan');
    }

    $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
    if ($programStudi) {
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        if ($fakultas) {
            $dosen->nama_fakultas = $fakultas->nama_fakultas;
        }
    }

    // Mengambil data prodi mahasiswa
    $prodiMahasiswa = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
    if ($prodiMahasiswa) {
        $mahasiswa->nama_prodi = $prodiMahasiswa->nama_prodi;

        // Mengambil data fakultas mahasiswa
        $fakultasMahasiswa = Fakultas::where('id_fakultas', $prodiMahasiswa->id_fakultas)->first();
        if ($fakultasMahasiswa) {
            $mahasiswa->nama_fakultas = $fakultasMahasiswa->nama_fakultas;
        }
    }   

    $ips = Khs::join('mahasiswa', 'khs.nim', '=', 'mahasiswa.nim')
        ->select(DB::raw('SUM(khs.bobot * CASE 
            WHEN khs.nilai_huruf = "A" THEN 4
            WHEN khs.nilai_huruf = "B" THEN 3
            WHEN khs.nilai_huruf = "C" THEN 2
            WHEN khs.nilai_huruf = "D" THEN 1
            ELSE 0
        END) / SUM(khs.bobot) as IPS'))
        ->where('mahasiswa.nim', $mahasiswa->nim)
        ->whereRaw('khs.semester + 1 = mahasiswa.semester')
        ->groupBy('mahasiswa.nim')
        ->first();

        $ips = $ips ? $ips->IPS : 0;
        $mahasiswa->ips = round($ips, 2);
        $maxSks = 0;
        $semester = $mahasiswa->semester;
        if ($semester == 1){
            $maxSks = 20;
        } elseif ($ips < 2){
            $maxSks = 18;
        } elseif ($semester == 2 || $ips < 2.5){
            $maxSks = 20;
        } elseif ($ips < 3){
            $maxSks = 22;
        } else {
            $maxSks = 24;
        }
        $mahasiswa->maxSks = $maxSks;
        
        return Inertia::render('(kaprodi)/data-mahasiswa/detail', [
            'dosen' => $dosen,
            'mahasiswa' => $mahasiswa
        ]);
    }

}
