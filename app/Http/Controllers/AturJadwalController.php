<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalKuliah;
use App\Models\Dosen;
use App\Models\DosenKelas;
use App\Models\DosenKelasModel;
use App\Models\DosenMk;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\ProgramStudi;
use App\Models\KalenderAkademik;
use App\Models\Ruangan;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AturJadwalController extends Controller
{
    public function index(){    
        $user = Auth::user();

        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;

        $tahun = KalenderAkademik::getTahunAkademik();

        $mataKuliah = MataKuliah::where('id_prodi', $dosen->id_prodi)
            ->with(['kelas' => function ($query) use ($tahun) {
                $query->where('tahun_akademik', $tahun);
            }])
            ->get();
        $mataKuliah->each(function ($mk) {
            $mk->kelas->each(function ($kelas) {
                $kelas->load('jadwalKuliah');
            });
        });
        $mataKuliah->each(function ($mk) {
            $mk->kelas->each(function ($kelas) {
                $kelas->load(['jadwalKuliah' => function ($query) {
                    $query->with('ruangan');
                }]);
            });
        });

        $listDosen = Dosen::where('id_prodi', $dosen->id_prodi)
            ->select('nip', 'nama')
            ->get();

        $ruangan = Ruangan::where('id_prodi', $dosen->id_prodi)
            ->where('diajukan', 1)
            ->where('disetujui', 1)
            ->select('id_ruang', 'nama_ruang', 'kuota')
            ->get();

        return Inertia::render('(kaprodi)/atur-jadwal/page', ['dosen' => $dosen, 'mataKuliah' => $mataKuliah, 'listDosen' => $listDosen, 'ruangan' => $ruangan]);
    }

    public function store(Request $request)
    {
        $tahunAkademik = KalenderAkademik::getTahunAkademik();

        DB::beginTransaction();
        try {
            DB::table('jadwal_kuliah')
            ->join('kelas', 'jadwal_kuliah.id_kelas', '=', 'kelas.id')
            ->where('kelas.kode_mk', $request->scheduleForms[0]['courseId'])
            ->where('kelas.tahun_akademik', $tahunAkademik)
            ->delete();

            foreach ($request->scheduleForms as $kelas) {
                foreach ($kelas['jadwal'] as $jadwal){
                    if ($jadwal['day'] == '') continue;
                    JadwalKuliah::create([
                        'hari' => $jadwal['day'],
                        'waktu_mulai' => $jadwal['startTime'],
                        'waktu_selesai' => ''.$jadwal['endTime'].':00',
                        'id_ruang' => $jadwal['idRuang'],
                        'id_kelas' => $kelas['idKelas'],
                    ]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan jadwal.');
        }

        return redirect()->back()->with('success', 'Jadwal berhasil disimpan.');
    }

    public function ubah_status(){
        $user = Auth::user();
        $tahun_akademik = KalenderAkademik::getTahunAkademik();

        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $status = Kelas::join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->where('mata_kuliah.id_prodi', $dosen->id_prodi)
            ->where('kelas.tahun_akademik', $tahun_akademik)
            ->select('kelas.status')
            ->first()
            ->status;
        error_log($status);
        if ($status == 'belum'){
            Kelas::join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
                ->where('mata_kuliah.id_prodi', $dosen->id_prodi)
                ->where('kelas.tahun_akademik', $tahun_akademik)
                ->update(['kelas.status' => 'diajukan']);
        } elseif ($status == 'diajukan'){
            Kelas::join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
                ->where('mata_kuliah.id_prodi', $dosen->id_prodi)
                ->where('kelas.tahun_akademik', $tahun_akademik)
                ->update(['kelas.status' => 'belum']);
        }
    }
}
