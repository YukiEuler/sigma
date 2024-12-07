<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Khs;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KHSController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
        $mahasiswa->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;
        $dosen = Dosen::where('nip', $mahasiswa->nip_dosen_wali)->first();
        $mahasiswa->nama_dosen_wali = $dosen->nama;
        
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
        error_log($khs);

        return Inertia::render('(mahasiswa)/khs/page', ['mahasiswa' => $mahasiswa, 'khs' => $khs]);
    }
}
