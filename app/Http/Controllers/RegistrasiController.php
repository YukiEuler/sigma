<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RegistrasiController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Mahasiswa'){
            return redirect()->route('home');
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
        $mahasiswa->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;

        return Inertia::render('(mahasiswa)/registrasi/page', ['mahasiswa' => $mahasiswa]);
    }

    public function updateStatus(Request $request)
{
    $user = Auth::user();
    $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();
    
    if (!$mahasiswa) {
        // return response()->json(['message' => 'Mahasiswa tidak ditemukan'], 404);
        return back()->with('error', 'Mahasiswa tidak ditemukan');
    }

    $request->validate([
        'status' => 'required|in:Aktif,Cuti,Belum Aktif'
    ]);

    try {
        DB::table('mahasiswa')
            ->where('nim', $mahasiswa->nim)
            ->update([
                'status' => $request->status
            ]);
        
        // return response()->json(['message' => 'Status berhasil diubah'], 200);
        return back()->with('success', 'Status berhasil diubah');
    } catch (\Exception $e) {
        Log::error($e->getMessage());
        // return response()->json(['message' => 'Terjadi kesalahan saat mengubah status'], 500);
        return back()->with('error', 'Terjadi kesalahan saat mengubah status');
    }
}
}
