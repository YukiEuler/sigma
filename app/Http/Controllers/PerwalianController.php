<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Irs;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PerwalianController extends Controller
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

        $mahasiswa = Mahasiswa::where('nip_dosen_wali', $dosen->nip)
        ->get()
        ->map(function ($mhs) {
            // Mengambil data program studi untuk setiap mahasiswa
            $prodiMhs = ProgramStudi::where('id_prodi', $mhs->id_prodi)->first();
            $mhs->nama_prodi = $prodiMhs ? $prodiMhs->nama_prodi : null;
            return $mhs;
        });

        $jumlahMahasiswa = Mahasiswa::where('nip_dosen_wali', $dosen->nip)->count();
        
        return Inertia::render('(dosen)/perwalian/page', [
            'dosen' => $dosen,
            'mahasiswa' => $mahasiswa,
            'jumlahMahasiswa' => $jumlahMahasiswa
        ]);
    }

    public function detail($id){
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('nim', $id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
        $mahasiswa->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;
        $dosen = Dosen::where('nip', $mahasiswa->nip_dosen_wali)->first();
        $mahasiswa->nama_dosen_wali = $dosen->nama;
        
        $irs = Irs::where('nim', $mahasiswa->nim)
            ->where('diajukan', 1)
            ->join('kelas', 'kelas.id', '=', 'irs.id_kelas')
            ->join('mata_kuliah', 'mata_kuliah.kode_mk', '=', 'kelas.kode_mk')
            ->select('*', 'irs.semester as irs_semester')
            ->with([
                'kelas.jadwalKuliah' => function ($query) {
                    $query->with('ruangan');
                },
                'mataKuliah.dosenMk.dosen'
            ])
            ->get()
            ->sortBy(function ($row) {
                $days = ['Senin' => 1, 'Selasa' => 2, 'Rabu' => 3, 'Kamis' => 4, 'Jumat' => 5];
                $dayOrder = $days[$row->kelas->jadwalKuliah->first()->hari] ?? 6;
                $timeOrder = strtotime($row->kelas->jadwalKuliah->first()->waktu_mulai);
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

        return Inertia::render('(dosen)/perwalian/detail', ['mahasiswa' => $mahasiswa, 'irs' => $irs, 'dosen' => $dosen,]);
    }
    public function verifyIRS(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        $checkedItems = $request->input('checkedItems');

        if (!empty($checkedItems)) {
            foreach ($checkedItems as $nim) {
                DB::table('irs')
                    ->where('nim', $nim)
                    ->update(['is_verified' => 1]);
            }
        }
        return redirect()->back();
    }
    public function redoverifyIRS(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        $checkedItems = $request->input('checkedItems');

        if (!empty($checkedItems)) {
            foreach ($checkedItems as $nim) {
                DB::table('irs')
                    ->where('nim', $nim)
                    ->update(['is_verified' => 0]);
            }
        }
        return redirect()->back();
    }

}
