<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DataMKController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Jika tidak ada user yang terautentikasi, redirect ke halaman login
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        // Mendapatkan data dosen berdasarkan user ID
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;
        
        // Mengambil semua data mata kuliah dari database
        $mataKuliah = MataKuliah::all();

        // Mengirim data ke komponen React melalui Inertia
        return Inertia::render('(kaprodi)/data-matakuliah/page', [
            'mataKuliah' => $mataKuliah,
            'dosen' => $dosen
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $dosen = Dosen::where('user_id', $user->id)->first();
    
        try {
            // Validasi request
            $validated = $request->validate([
                'kode' => [
                    'required',
                    'string',
                    'max:30',
                ],
                'nama' => 'required|string|max:100',
                'sks' => 'required|integer|min:1',
                'semester' => 'required|in:1,2,3,4,5,6,7,8',
                'jenis' => 'required|in:Wajib,Pilihan',
            ], [
                'kode.required' => 'Kode mata kuliah wajib diisi!',
                'kode.unique' => 'Kode mata kuliah sudah digunakan!',
                'nama.required' => 'Nama mata kuliah wajib diisi!',
                'sks.required' => 'SKS wajib diisi!',
                'sks.min' => 'SKS minimal 1!',
                'semester.required' => 'Semester wajib diisi!',
                'semester.in' => 'Semester harus antara 1-8!',
                'jenis.required' => 'Jenis mata kuliah wajib diisi!',
                'jenis.in' => 'Jenis mata kuliah harus Wajib atau Pilihan!'
            ]);

            $existByKode = MataKuliah::where('kode_mk', $validated['kode'])  // Perhatikan menggunakan 'kode' bukan 'kode_mk'
                ->where('id_prodi', $dosen->id_prodi)
                ->first();

            $existByNama = MataKuliah::where('nama', $validated['nama'])  // Memeriksa berdasarkan nama mata kuliah
                ->where('id_prodi', $dosen->id_prodi)
                ->first();

            if ($existByKode) {
                return response()->json([
                    'error' => 'Mata kuliah dengan kode ini sudah ada.'
                ], 422);
            }

            if ($existByNama) {
                return response()->json([
                    'error' => 'Mata kuliah dengan nama ini sudah ada.'
                ], 422);
            }
    
            // Create mata kuliah
             $mataKuliah = MataKuliah::create([
                'kode_mk' => $validated['kode'],
                'nama' => $validated['nama'],
                'sks' => $validated['sks'],
                'semester' => $validated['semester'],
                'jenis' => $validated['jenis'],
                'id_prodi' => $dosen->id_prodi
            ]);
    
            if(!$mataKuliah) {
                // return back()->with('error', 'Gagal menambahkan mata kuliah.');
                return response()->json([
                    'error' => 'Gagal menambahkan mata kuliah.'
                ], 422);
            }
    
            // return back()->with('success', 'Mata kuliah berhasil ditambahkan.');
            return response()->json([
                'success' => true
            ]);

        } catch (\Exception $e) {
            // return back()->with('error', 'Terjadi kesalahan saat menambahkan ruangan.');
            return response()->json([
                'error' => 'Terjadi kesalahan saat menambahkan mata kuliah.'
            ], 422);
        }
    }

    public function update(Request $request, $kode_mk)
    {
        $user = Auth::user();
        $dosen = Dosen::where('user_id', $user->id)->first();

        try {
            // Validasi request
            $validated = $request->validate([
                'nama' => 'required|string|max:100',
                'sks' => 'required|integer|min:1',
                'semester' => 'required|in:1,2,3,4,5,6,7,8',
                'jenis' => 'required|in:Wajib,Pilihan',
            ], [
                'nama.required' => 'Nama mata kuliah wajib diisi!',
                'sks.required' => 'SKS wajib diisi!',
                'sks.min' => 'SKS minimal 1!',
                'semester.required' => 'Semester wajib diisi!',
                'semester.in' => 'Semester harus antara 1-8!',
                'jenis.required' => 'Jenis mata kuliah wajib diisi!',
                'jenis.in' => 'Jenis mata kuliah harus Wajib atau Pilihan!'
            ]);

            // Cek apakah mata kuliah dengan nama yang sama sudah ada (kecuali untuk mata kuliah yang sedang diedit)
            $existByNama = MataKuliah::where('nama', $validated['nama'])
                ->where('id_prodi', $dosen->id_prodi)
                ->where('kode_mk', '!=', $kode_mk)
                ->first();

            if ($existByNama) {
                return response()->json([
                    'error' => 'Mata kuliah dengan nama ini sudah ada.'
                ], 422);
            }

            // Update mata kuliah
            $mataKuliah = MataKuliah::where('kode_mk', $kode_mk)
                ->where('id_prodi', $dosen->id_prodi)
                ->first();

            if (!$mataKuliah) {
                return response()->json([
                    'error' => 'Mata kuliah tidak ditemukan.'
                ], 404);
            }

            $mataKuliah->update([
                'nama' => $validated['nama'],
                'sks' => $validated['sks'],
                'semester' => $validated['semester'],
                'jenis' => $validated['jenis'],
            ]);

            return response()->json([
                'success' => true
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan saat mengupdate mata kuliah.'
            ], 422);
        }
    }

    public function destroy($kode_mk)
    {
        try {
           
            // Pastikan user adalah Kaprodi yang berwenang
            $user = Auth::user();
            $dosen = Dosen::where('user_id', $user->id)->first();
            
            // Cari mata kuliah
            $mataKuliah = MataKuliah::where('kode_mk', $kode_mk)
                                   ->where('id_prodi', $dosen->id_prodi)
                                   ->first();
            
            if (!$mataKuliah) {
                return back()->with('error', 'Mata kuliah tidak ditemukan.');
            };

            $mataKuliah->delete();
            return back()->with('success', 'Mata kuliah berhasil dihapus.');

        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menghapus mata kuliah.');
        }
    }
}