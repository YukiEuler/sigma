<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $request->validate([
            'kode' => 'required|string|max:10',
            'nama' => 'required|string|max:255',
            'sks' => 'required|integer|min:1',
            'semester' => 'required|integer|min:1',
            'jenis' => 'required|string|max:50',
        ]);

        MataKuliah::create($request->all());

        return redirect()->back()->with('success', 'Mata Kuliah berhasil ditambahkan');
    }

}