<?php

namespace App\Http\Controllers;

use App\Models\Khs;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Irs;
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

    $mahasiswa = Mahasiswa::where('id_prodi', $dosen->id_prodi)
        ->with(['dosen', 'irs' => function ($query) use ($tahun_akademik) {
            $query->where('irs.tahun_akademik', $tahun_akademik)  // Specify the table name
                ->join('kelas', 'irs.id_kelas', '=', 'kelas.id')
                ->join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
                ->select('irs.*', 'mata_kuliah.sks');
        }])
        ->get();

    $ips = Khs::join('mahasiswa', 'khs.nim', '=', 'mahasiswa.nim')
        ->join('mata_kuliah', 'khs.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->select(DB::raw('SUM(khs.bobot * mata_kuliah.sks) / SUM(mata_kuliah.sks) as IPS'), 'mahasiswa.nim')
        ->where('mahasiswa.id_prodi', $dosen->id_prodi)
        ->whereRaw('khs.semester + 1 = mahasiswa.semester')
        ->groupBy('mahasiswa.nim')
        ->get();

    $mahasiswa->each(function ($mhs) use ($ips) {
        $mhsIps = $ips->firstWhere('nim', $mhs->nim);
        $mhs->ip_lalu = $mhsIps ? $mhsIps->IPS : null;
        
        // Calculate total SKS being taken this semester
        $mhs->sks_diambil = $mhs->irs->sum('sks') ?? 0;
        
        if ($mhs->irs->isEmpty() || $mhs->irs[0]->diajukan == 0){
            $mhs->status_irs = 'Not Submitted';
        } elseif ($mhs->irs[0]->disetujui == 0){
            $mhs->status_irs = 'Not Approved';
        } else {
            $mhs->status_irs = 'Approved';
        }
    });

    return Inertia::render('(kaprodi)/data-mahasiswa/page', [
        'dosen' => $dosen, 
        'mahasiswa' => $mahasiswa
    ]);
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
            ->join('mata_kuliah', 'khs.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->select(DB::raw('SUM(khs.bobot * mata_kuliah.sks) / SUM(mata_kuliah.sks) as IPS'), 'mahasiswa.nim')
            ->where('mahasiswa.nim', $id)
            ->whereRaw('khs.semester + 1 = mahasiswa.semester')
            ->groupBy('mahasiswa.nim')
            ->get();

        error_log($ips);

        $ips = $ips->isEmpty() ? 0 : $ips[0]->IPS;
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

        $jumlahSksWajib = Khs::join('mata_kuliah', 'khs.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->where('khs.nim', $mahasiswa->nim)
            ->where('mata_kuliah.jenis', 'Wajib')
            ->sum('mata_kuliah.sks'); // Changed from bobot to sks based on your MataKuliah model

        $jumlahSksPilihan = Khs::join('mata_kuliah', 'khs.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->where('khs.nim', $mahasiswa->nim)
            ->where('mata_kuliah.jenis', 'Pilihan')
            ->sum('mata_kuliah.sks'); // Changed from bobot to sks based on your MataKuliah model

        // For debugging, let's add these queries
        // $khsData = Khs::with('mataKuliah')
        //     ->where('nim', $mahasiswa->nim)
        //     ->get();

        // dd([
        //     'SKS Wajib' => $jumlahSksWajib,
        //     'SKS Pilihan' => $jumlahSksPilihan,
        //     'KHS Data' => $khsData
        // ]);

        $mahasiswa->sks_wajib = $jumlahSksWajib ?? 0;
        $mahasiswa->sks_pilihan = $jumlahSksPilihan ?? 0;

        $irs = Irs::where('nim', $mahasiswa->nim)
            ->where('diajukan', 1)
            ->join('kelas', 'kelas.id', '=', 'irs.id_kelas')
            ->join('mata_kuliah', 'mata_kuliah.kode_mk', '=', 'kelas.kode_mk')
            ->select('*', 'irs.semester as irs_semester', 'irs.status as status_irs')
            ->with([
                'kelas.jadwalKuliah' => function ($query) {
                    $query->with('ruangan');
                },
                'mataKuliah.dosenMk.dosen'
            ])
            ->get()
            ->sortBy(function ($row) {
                $days = ['Senin' => 1, 'Selasa' => 2, 'Rabu' => 3, 'Kamis' => 4, 'Jumat' => 5];
                $dayOrder = isset($row->kelas->jadwalKuliah->first()->hari) ? ($days[$row->kelas->jadwalKuliah->first()->hari] ?? 6) : 6;
                $timeOrder = isset($row->kelas->jadwalKuliah->first()->waktu_mulai) ? strtotime($row->kelas->jadwalKuliah->first()->waktu_mulai) : 0;
                return $dayOrder * 1000000000 + $timeOrder;
            })
            ->groupBy('irs_semester')
            ->map(function ($rows, $semester) {
                $totalSks = $rows->sum('sks');
                $tahunAkademik = $rows->first()->tahun_akademik;
                $tahunAkademikSplit = explode('-', $tahunAkademik);
                $tahun = (int) $tahunAkademikSplit[0];
                $periode = (int) $tahunAkademikSplit[1] % 2;
                $paritasSemester = $periode == 0 ? "Ganjil" : "Genap";
                $semester = $rows->first()->irs_semester;
                $jadwal = $rows->map(function ($row) {
                    $row->mataKuliah->dosen = collect($row->mataKuliah->dosenMk)->filter(function ($dosenMk) use ($row) {
                        return $dosenMk['tahun_akademik'] === $row->tahun_akademik;
                    })->map(function ($dosenMk) {
                        return $dosenMk['dosen'];
                    })->values()->toArray();
        
                    $row->jadwal_kuliah = $row->kelas->jadwalKuliah->toArray();
                    return $row->toArray();
                });
                return [
                    'title' => 'Semester '.$semester.' | Tahun Ajaran '.($tahun-$periode).'/'.($tahun-$periode+1).' '.$paritasSemester,
                    'sks' => $totalSks,
                    'courses' => $jadwal,
                ];
            });
        
        
        // error_log($irs['1']['courses']);
        // error_log($irs);

        $khs = Khs::where('nim', $mahasiswa->nim)
            ->join('mata_kuliah', 'mata_kuliah.kode_mk', '=', 'khs.kode_mk')
            ->select('*', 'khs.semester as khs_semester', 'khs.status as status_khs')
            ->get()
            ->groupBy('khs_semester')
            ->map(function ($rows, $semester) {
                $totalSks = $rows->sum('sks');
                // $tahunAkademik = $rows->first()->tahun_akademik;
                // $tahunAkademikSplit = explode('-', $tahunAkademik);
                // $tahun = (int) $tahunAkademikSplit[0];
                $periode = 1 - $rows->first()->semester % 2;
                $tahun = $rows->first()->tahun;
                $paritasSemester = $periode == 0 ? "Ganjil" : "Genap";
                $semester = $rows->first()->khs_semester;
                return [
                    'title' => 'Semester '.$semester.' | Tahun Ajaran '.($tahun-$periode).'/'.($tahun-$periode+1).' '.$paritasSemester,
                    'sks' => $totalSks,
                    'courses' => $rows->map(function ($row) {
                        $bobot = match ($row->nilai_huruf) {
                            'A' => 4,
                            'B' => 3,
                            'C' => 2,
                            'D' => 1,
                            'E' => 0,
                            default => 0,
                        };
                        return [
                            'kode_mk' => $row->kode_mk,
                            'nama' => $row->nama,
                            'sks' => $row->sks,
                            'nilai_huruf' => $row->nilai_huruf,
                            'bobot' => $bobot,
                            'sks_x_bobot' => $bobot * $row->sks,
                            'status' => $row->status_khs,
                        ];
                    }),
                ];
            });
        
        
        // error_log($khs['1']['courses']);
        // error_log($khs);
        
        return Inertia::render('(kaprodi)/data-mahasiswa/detail', [
            'dosen' => $dosen,
            'mahasiswa' => $mahasiswa,
            'irs' => $irs,
            'khs' => $khs
        ]);
    }

}
